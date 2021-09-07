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
    public class RolesController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        public RolesController(VacationManagerContext vacationManagerContext)
        {
            _vacationManagerContext = vacationManagerContext;
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = await _vacationManagerContext.Roles.ToListAsync();
                if (roles == null)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }

                return Ok(new { message = roles, ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Getting Data", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("GetRole")]
        public async Task<IActionResult> GetRole(int? roleId)
        {
            if (roleId == null)
            {
                return BadRequest();
            }

            try
            {
                var role = await _vacationManagerContext.Roles.FirstOrDefaultAsync(x => x.RoleId == roleId);

                if (role == null)
                {
                    return NotFound();
                }

                return Ok(role);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] AddRoleDto model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Name))
                {
                    return Ok(new { message = "Bad Request", ErrorHappen = true });
                }

                Role roleToAdd = new Role() { RoleName = model.Name };
                _vacationManagerContext.Roles.Add(roleToAdd);
                var roleId = await _vacationManagerContext.SaveChangesAsync();
                if (roleId > 0)
                {
                    return Ok(new { message = "Role Added Successfully" ,RoleId = roleToAdd.RoleId, ErrorHappen = false });
                }
                else
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }
            }
            catch (Exception)
            {
                return Ok(new { message = "Bad Request", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpDelete("DeleteRole/{id}")]
        public async Task<IActionResult> DeleteRole(int? id)
        {
            int result = 0;

            if (id == null)
            {
                return Ok(new { message = "Bad Request", ErrorHappen = true });
            }

            try
            {
                Role roleToDelete = _vacationManagerContext.Roles.FirstOrDefault(x => x.RoleId == id);
                _vacationManagerContext.Roles.Remove(roleToDelete);
                result = await _vacationManagerContext.SaveChangesAsync();
                if (result == 0)
                {
                    return Ok(new { message = "Not Found", ErrorHappen = true });
                }
                return Ok(new { message = "Role Deleted Successfully", ErrorHappen = false });
            }
            catch (Exception)
            {
                return Ok(new { message = "Error Happen While Delete Role", ErrorHappen = true });
            }
        }


        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdatePost([FromBody] Role model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.RoleName))
                {
                    return BadRequest();
                }

                Role roleToUpdate = _vacationManagerContext.Roles.FirstOrDefault(x => x.RoleId == model.RoleId);
                roleToUpdate.RoleName = model.RoleName;
                _vacationManagerContext.Roles.Update(roleToUpdate);
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
