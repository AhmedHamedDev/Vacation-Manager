using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Models.Domain;
using Utilities.Supplies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using Utilities.Contracts;
using DAL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;

namespace VacationManagerBackEnd.Controllers
{
    public class AuthorizedAbility : Attribute, IActionFilter
    {
        private IJwt _jwt;
        private readonly VacationManagerContext _vacationManagerContext;
        public static ConcurrentDictionary<int, List<string>> userAbilities = new ConcurrentDictionary<int, List<string>>();

        public AuthorizedAbility(IJwt jwt, VacationManagerContext vacationManagerContext)
        {
            _jwt = jwt;
            _vacationManagerContext = vacationManagerContext;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            try
            {
                Microsoft.Extensions.Primitives.StringValues token;
                context.HttpContext.Request.Headers.TryGetValue("token", out token);

                if (!_jwt.ValidateCurrentToken(token))
                {
                    context.Result = new RedirectToRouteResult(
                         new RouteValueDictionary { { "controller", "Account" }, { "action", "NotAuthoriced" } });
                    return;
                }

                int userId = int.Parse(_jwt.GetId(token));

                string controllerName = context.RouteData.Values["controller"].ToString();
                string actionName = context.RouteData.Values["action"].ToString();
                string url = "/" + controllerName + "/" + actionName;

                List<string> abilities;
                if (userAbilities.ContainsKey(userId))
                    abilities = userAbilities[userId];
                else
                {
                    abilities = _vacationManagerContext.Users_Roles.Where(x => x.UserId == userId).Include(x => x.Role).SelectMany(x => x.Role.Role_Ability).Select(x => x.Ability.Url).ToList();
                    userAbilities.TryAdd(userId, abilities);
                }

                if (!abilities.Where(s => s == url).Any())
                {
                    context.Result = new RedirectToRouteResult(
                         new RouteValueDictionary { { "controller", "Account" }, { "action", "NotAuthoriced" } });
                    return;
                }

                context.HttpContext.Items.Add("userId", userId);
            }
            catch (Exception e)
            {
                context.Result = new RedirectToRouteResult(
                  new RouteValueDictionary { { "controller", "Account" }, { "action", "NotAuthoriced" } });
                return;
            }
        }
    }
}
