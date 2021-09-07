using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class User_ChechIn
    {
        public DateTime CheckInDateTime { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
