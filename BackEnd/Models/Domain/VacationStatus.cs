using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class VacationStatus
    {
        public int StatusId { get; set; }
        public string name { get; set; }

        public ICollection<Vacation> vacations { get; set; }
    }
}
