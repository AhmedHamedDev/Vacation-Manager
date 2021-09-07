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
    public class HolidaysController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        public HolidaysController(VacationManagerContext vacationManagerContext)
        {
            _vacationManagerContext = vacationManagerContext;
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetHolidays")]
        public async Task<IActionResult> GetHolidays()
        {
            try
            {
                var holidays = await _vacationManagerContext.Holidays.ToListAsync();
                if (holidays == null)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }

                return Ok(new { message = holidays.Select(x => new {Id = x.HolidayId, Name = x.Name, Date = x.Date.ToString("dd-MM-yyyy") }), ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetHoliday")]
        public async Task<IActionResult> GetHoliday(int? holidayId)
        {
            if (holidayId == null)
            {
                return BadRequest();
            }

            try
            {
                var holiday = await _vacationManagerContext.Holidays.FirstOrDefaultAsync(x => x.HolidayId == holidayId);

                if (holiday == null)
                {
                    return NotFound();
                }

                return Ok(holiday);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPost("AddHoliday")]
        public async Task<IActionResult> AddHoliday([FromBody] AddHolidayDto model)
        {
            try
            {
                if (model.Date == null)
                {
                    return Ok(new { message = "Bad Request", ErrorHappen = true });
                }
                Holiday holiday = new Holiday() { Name = model.Name, Date = DateTime.Parse(model.Date)};
                _vacationManagerContext.Holidays.Add(holiday);
                var holidayId = await _vacationManagerContext.SaveChangesAsync();
                if (holidayId > 0)
                {
                    return Ok(new { message = "Holiday Added Successfully", holidayId = holiday.HolidayId, ErrorHappen = false });
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
        [HttpDelete("DeleteHoliday/{Id}")]
        public async Task<IActionResult> DeleteHoliday(int? Id)
        {
            int result = 0;

            if (Id == null)
            {
                return Ok(new { message = "Holiday Id not valid", ErrorHappen = true });
            }

            try
            {
                Holiday holidayToDelete = _vacationManagerContext.Holidays.FirstOrDefault(x => x.HolidayId == Id);
                _vacationManagerContext.Holidays.Remove(holidayToDelete);
                result = await _vacationManagerContext.SaveChangesAsync();
                if (result == 0)
                {
                    return Ok(new { message = "Holiday Id Not Found", ErrorHappen = true });
                }
                return Ok(new { message = "Holiday Deleted Successfully", ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Sorry something went wrong while deleting holiday", ErrorHappen = true });
            }
        }


        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPut("UpdateHoliday")]
        public async Task<IActionResult> UpdateHoliday([FromBody] Holiday model)
        {
            try
            {
                if (model.Date == null)
                {
                    return BadRequest();
                }

                Holiday holidayToUpdate = _vacationManagerContext.Holidays.FirstOrDefault(x => x.HolidayId == model.HolidayId);
                holidayToUpdate.Date = model.Date;
                holidayToUpdate.Name = model.Name;
                _vacationManagerContext.Holidays.Update(holidayToUpdate);
                await _vacationManagerContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                if (ex.GetType().FullName == "Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException")
                {
                    return NotFound();
                }
                return BadRequest();
            }
        }
    }
}
