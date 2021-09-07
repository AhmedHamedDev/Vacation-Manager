using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class User_Role
    {
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

    }
}
