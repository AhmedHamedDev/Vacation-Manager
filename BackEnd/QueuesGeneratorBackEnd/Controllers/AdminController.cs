using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VacationManagerBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        public AdminController(VacationManagerContext vacationManagerContext)
        {
            _vacationManagerContext = vacationManagerContext;
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetAllOtherUsers")]
        public IActionResult GetAllOtherUsers()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                var users = _vacationManagerContext.Users.Where(x=>x.UserId != userId).Select(x => new { id=x.UserId, name = x.UserName, email = x.UserEmail });

                return Ok(new { message = users, ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }
    }
}
