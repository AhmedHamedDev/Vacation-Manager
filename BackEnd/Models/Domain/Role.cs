using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public ICollection<User_Role> User_Role { get; set; }
        public ICollection<Role_Ability> Role_Ability { get; set; }

    }
}
