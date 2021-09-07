using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class Role_Ability
    {
        public int AbilityId { get; set; }
        public Ability Ability { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }

    }
}
