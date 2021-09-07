using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models.Domain;
using Models.DTO;
using Utilities.Contracts;
using Utilities.Supplies;

namespace VacationManagerBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly VacationManagerContext _vacationManagerContext;
        private IJwt _jwt;
        private IEmail _email;
        private IConfiguration _configuration;

        public AccountController(VacationManagerContext vacationManagerContext, IJwt jwt, IEmail email, IConfiguration configuration)
        {
            _vacationManagerContext = vacationManagerContext;
            _jwt = jwt;
            _email = email;
            _configuration = configuration;
        }

        [HttpGet("NotAuthoriced")]
        public IActionResult NotAuthoriced()
        {
            return Ok(new { message = "Not Authorized", ErrorHappen = true });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLoginDTO userLoginDto)
        {
            try
            {
                User user = _vacationManagerContext.Users.FirstOrDefault(x => x.UserEmail == userLoginDto.Email);

                if (user == null || Encription.Decrypt(user?.Password, "SecretCode_hamed") != userLoginDto.Password)
                {
                    return Ok(new { message = "Wrong Email or Password", ErrorHappen = true });
                }

                if (!user.Active)
                {
                    return Ok(new { message = "Your account is not active yet, please check your email", ErrorHappen = true });
                }

                var userVacations = _vacationManagerContext.Vacations.Where(x => x.UserId == user.UserId && x.StatusId == 2).Select(x=>x.Date.ToString("dd/MM/yyyy")).ToList();
                var holidays = _vacationManagerContext.Holidays.Select(x => x.Date.ToString("dd/MM/yyyy")).ToList();
                var userCheckInsForToday = _vacationManagerContext.User_ChechIns.Where(x => x.CheckInDateTime.Day == DateTime.Now.Day).ToList();

                if(userCheckInsForToday.Count == 0 && DateTime.Now.DayOfWeek.ToString() != "Friday" && DateTime.Now.DayOfWeek.ToString() != "Saturday" && !userVacations.Any(x=>x == DateTime.Now.ToString("dd/MM/yyyy")) && !holidays.Any(x => x == DateTime.Now.ToString("dd/MM/yyyy")))
                {
                    _vacationManagerContext.User_ChechIns.Add(new User_ChechIn() { UserId = user.UserId, CheckInDateTime = DateTime.Now});
                    _vacationManagerContext.SaveChanges();
                }

                List<int> abilitiesIds = _vacationManagerContext.Users_Roles.Where(x => x.UserId == user.UserId).Include(x => x.Role).SelectMany(x => x.Role.Role_Ability).Select(x => x.Ability.AbilityId).ToList();
                string token = _jwt.GenerateToken(user.UserId);

                return Ok(new { Token = token, AbilitiesIds = abilitiesIds, userName = user.UserName, userEmail = user.UserEmail, ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Something went wrong", ErrorHappen = true });
            }
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserRegisterDTO userRegisterDto)
        {
            try
            {
                if (userRegisterDto.Password.Length < 5)
                {
                    return Ok(new { message = "Password can't be less than 5 char", ErrorHappen = true });
                }

                User userObj = _vacationManagerContext.Users.FirstOrDefault(x => x.UserEmail == userRegisterDto.Email);

                if (userObj != null)
                {
                    return Ok(new { message = "This Email Already Exsist", ErrorHappen = true });
                }

                User user = new User();
                user.Password = Encription.Encrypt(userRegisterDto.Password, "SecretCode_hamed");
                user.UserName = userRegisterDto.Name;
                user.UserEmail = userRegisterDto.Email;
                user.Active = true;

                _vacationManagerContext.Users.Add(user);
                _vacationManagerContext.SaveChanges();

                User_Role user_Role = new User_Role();
                user_Role.RoleId = 2;
                user_Role.UserId = user.UserId;

                _vacationManagerContext.Users_Roles.Add(user_Role);
                _vacationManagerContext.SaveChanges();

                string token = _jwt.GenerateToken(user.UserId);
                //_email.SendAccountActivationEmail(user.UserEmail, _configuration.GetSection("Frontend:Url").Value + "/account/activate-account/?token=" + token);

                return Ok(new { message = "User Registerd Successfully", ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Something went wrong", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                AuthorizedAbility.userAbilities.TryRemove(userId, out _);

                return Ok(new { message = "Logout done successfully", ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Something went wrong", ErrorHappen = true });
            }
        }


        [HttpGet("ActivateAccount")]
        public IActionResult ActivateAccount([FromQuery] string token)
        {
            try
            {
                if (!_jwt.ValidateCurrentToken(token))
                {
                    return Ok(new { message = "Token is not valid", ErrorHappen = true });
                }

                int userId = int.Parse(_jwt.GetId(token));
                User user = _vacationManagerContext.Users.FirstOrDefault(x => x.UserId == userId);
                user.Active = true;
                _vacationManagerContext.Users.Update(user);
                _vacationManagerContext.SaveChanges();

                return Ok(new { message = "Activation done successfully", ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Something went wrong", ErrorHappen = true });
            }
        }

        [ServiceFilter(typeof(AuthorizedAbility))]
        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                int userId = (int)this.HttpContext.Items["userId"];
                User userToChangeHisPassword = _vacationManagerContext.Users.FirstOrDefault(x=>x.UserId == userId);
                userToChangeHisPassword.Password = Encription.Decrypt(userToChangeHisPassword.Password, "SecretCode_hamed");

                if(userToChangeHisPassword.Password != changePasswordDTO.OldPassword)
                {
                    return Ok(new { message = "Old password is wrong", ErrorHappen = true });
                }

                if(changePasswordDTO.NewPassword.Length < 5)
                {
                    return Ok(new { message = "New password can't be less than 5 char", ErrorHappen = true });
                }

                userToChangeHisPassword.Password = Encription.Encrypt(changePasswordDTO.NewPassword, "SecretCode_hamed");
                _vacationManagerContext.Users.Update(userToChangeHisPassword);
                _vacationManagerContext.SaveChanges();

                return Ok(new { message = "Password Changed Successfully", ErrorHappen = false });
            }
            catch (Exception e)
            {
                return Ok(new { message = "Something went wrong", ErrorHappen = true });
            }
        }
    }
}
