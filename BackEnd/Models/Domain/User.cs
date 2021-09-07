using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }

        public ICollection<User_Role> User_Role { get; set; }
        public ICollection<User_ChechIn> User_ChechIns { get; set; }
        public ICollection<Vacation> vacations { get; set; }

    }
}
