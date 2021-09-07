using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacationManagerBackEnd.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace VacationManagerBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserCheckInsController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        public UserCheckInsController(VacationManagerContext vacationManagerContext)
        {
            _vacationManagerContext = vacationManagerContext;
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetUserCheckIns/{id}")]
        public IActionResult GetUserCheckIns(int id)
        {
            try
            {
                User user = _vacationManagerContext.Users.Include(x=>x.User_ChechIns).FirstOrDefault(x=>x.UserId == id);
                if (user == null) 
                {
                    return Ok(new { message = "This Email does not Exsist", ErrorHappen = true });
                }

                return Ok(new { message = user.User_ChechIns.Select(x=> new { Date = x.CheckInDateTime.ToString("dd/MM/yyyy"), Time =  x.CheckInDateTime.ToString("HH:mm:ss"), Day = x.CheckInDateTime.DayOfWeek.ToString() }), ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetCurrentUserCheckIns")]
        public IActionResult GetCurrentUserCheckIns()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                User user = _vacationManagerContext.Users.Include(x => x.User_ChechIns).FirstOrDefault(x => x.UserId == userId);
                if (user == null)
                {
                    return Ok(new { message = "This Email does not Exsist", ErrorHappen = true });
                }

                return Ok(new { message = user.User_ChechIns.Select(x => new { Date = x.CheckInDateTime.ToString("dd/MM/yyyy"), Time = x.CheckInDateTime.ToString("HH:mm:ss"), Day = x.CheckInDateTime.DayOfWeek.ToString() }), ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("CurrentUserCheckInsCalculations")]
        public IActionResult CurrentUserCheckInsCalculations()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                var userCheckinsCount = _vacationManagerContext.User_ChechIns.Where(x => x.UserId == userId && x.CheckInDateTime.Year == DateTime.Now.Year).Count();
                var userVacationsCount = _vacationManagerContext.Vacations.Where(x => x.UserId == userId && x.Date.Year == DateTime.Now.Year && x.StatusId == 2).Count();
                var holidaysCount = _vacationManagerContext.Holidays.Where(x => x.Date.Year == DateTime.Now.Year).Count();
                var margin = 365 - (userCheckinsCount + userVacationsCount + holidaysCount);
                var remainingVacationsCount = 24 - userVacationsCount;

                return Ok(new { remainingVacationsCount = remainingVacationsCount, userCheckinsCount = userCheckinsCount, userVacationsCount = userVacationsCount, holidaysCount = holidaysCount, margin = margin,  ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("UserCheckInsCalculations/{id}")]
        public IActionResult UserCheckInsCalculations(int id)
        {
            try
            {
                var userCheckinsCount = _vacationManagerContext.User_ChechIns.Where(x => x.UserId == id && x.CheckInDateTime.Year == DateTime.Now.Year).Count();
                var userVacationsCount = _vacationManagerContext.Vacations.Where(x => x.UserId == id && x.Date.Year == DateTime.Now.Year && x.StatusId == 2).Count();
                var holidaysCount = _vacationManagerContext.Holidays.Where(x => x.Date.Year == DateTime.Now.Year).Count();
                var margin = 365 - (userCheckinsCount + userVacationsCount + holidaysCount);
                var remainingVacationsCount = 24 - userVacationsCount;

                return Ok(new { remainingVacationsCount = remainingVacationsCount, userCheckinsCount = userCheckinsCount, userVacationsCount = userVacationsCount, holidaysCount = holidaysCount, margin = margin, ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }
    }
}
