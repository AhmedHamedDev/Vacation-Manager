using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class Holiday
    {
        public int HolidayId { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
    }
}
