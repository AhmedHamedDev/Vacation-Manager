using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class Ability
    {
        public int AbilityId { get; set; }
        public string AbilityName { get; set; }
        public string Url { get; set; }
        public ICollection<Role_Ability> Role_Ability { get; set; }
    }
}
