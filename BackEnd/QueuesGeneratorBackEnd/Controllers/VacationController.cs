using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Domain;
using Models.DTO;

namespace VacationManagerBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VacationController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        public VacationController(VacationManagerContext vacationManagerContext)
        {
            _vacationManagerContext = vacationManagerContext;
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetCurrentUserVacations")]
        public async Task<IActionResult> GetCurrentUserVacations()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                var vacations = await _vacationManagerContext.Vacations.Include("VacationStatus").ToListAsync();
                if (vacations == null)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }

                return Ok(new { message = vacations.Where(x=>x.UserId == userId).Select(x => new { Id = x.VacationId, Description = x.Description, Date = x.Date.ToString("dd-MM-yyyy"), Status = x.VacationStatus.name }), ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }


        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetAllVacations")]
        public async Task<IActionResult> GetAllVacations()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                var vacations = await _vacationManagerContext.Vacations.Include("VacationStatus").Where(x=>x.UserId != userId).ToListAsync();
                if (vacations == null)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }

                return Ok(new { message = vacations.Select(x => new { Id = x.VacationId, Description = x.Description, Date = x.Date.ToString("dd-MM-yyyy"), Status = x.VacationStatus.name }), ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetUserVacations/{Id}")]
        public async Task<IActionResult> GetUserVacations(int? Id)
        {
            try
            {
                var vacations = await _vacationManagerContext.Vacations.Include("VacationStatus").Where(x => x.UserId == Id).ToListAsync();
                if (vacations == null)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }

                return Ok(new { message = vacations.Select(x => new { Id = x.VacationId, Description = x.Description, Date = x.Date.ToString("dd-MM-yyyy"), Status = x.VacationStatus.name }), ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPost("ChangeVacationStatus")]
        public async Task<IActionResult> ChangeVacationStatus(ChangeVacationStatusDto changeVacationStatusDto)
        {
            try
            {
                var vacationToChange =  _vacationManagerContext.Vacations.FirstOrDefault(x => x.VacationId == changeVacationStatusDto.VacationId);
                vacationToChange.StatusId = changeVacationStatusDto.StatusId;
                _vacationManagerContext.Vacations.Update(vacationToChange);
                await _vacationManagerContext.SaveChangesAsync();

                return Ok(new { message = "Status Changed Successfully", ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While changing status", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPost("AddVacation")]
        public async Task<IActionResult> AddVacation([FromBody] AddVacationDto model)
        {
            try
            {
                if (model.Date == null)
                {
                    return Ok(new { message = "Bad Request", ErrorHappen = true });
                }

                if (DateTime.Compare(DateTime.Now, DateTime.Parse(model.Date)) > 0)
                {
                    return Ok(new { message = "Error Date is before today", ErrorHappen = true });
                }

                int userId = (int)this.HttpContext.Items["userId"];
                Vacation vacation = new Vacation() { Description = model.Description, Date = DateTime.Parse(model.Date), UserId = userId, StatusId = 1 };
                _vacationManagerContext.Vacations.Add(vacation);
                var holidayId = await _vacationManagerContext.SaveChangesAsync();

                if (holidayId > 0)
                {
                    return Ok(new { message = "Vavation Added Successfully", VavationId = vacation.VacationId, ErrorHappen = false });
                }
                else
                {
                    return Ok(new { message = "Error Happen While Adding Data", ErrorHappen = true });
                }
            }
            catch (Exception e)
            {
                return Ok(new { message = "Error Happen While Adding Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpDelete("DeleteVacation/{Id}")]
        public async Task<IActionResult> DeleteVacation(int? Id)
        {
            int result = 0;

            if (Id == null)
            {
                return Ok(new { message = "Vacation Id not valid", ErrorHappen = true });
            }

            try
            {
                Vacation vacationToDelete = _vacationManagerContext.Vacations.Include("VacationStatus").FirstOrDefault(x => x.VacationId == Id);
                if (vacationToDelete.StatusId == 2 || vacationToDelete.StatusId == 3 )
                {
                    return Ok(new { message = "can't delete this vacation because it is already " + vacationToDelete.VacationStatus.name, ErrorHappen = true });
                }

                _vacationManagerContext.Vacations.Remove(vacationToDelete);
                result = await _vacationManagerContext.SaveChangesAsync();
                if (result == 0)
                {
                    return Ok(new { message = "Vacation Id Not Found", ErrorHappen = true });
                }

                return Ok(new { message = "Vacation Deleted Successfully", ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Sorry something went wrong while deleting Vacation", ErrorHappen = true });
            }
        }

    }
}
