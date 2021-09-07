using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class Vacation
    {
        public int VacationId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int StatusId { get; set; }
        public VacationStatus VacationStatus { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
