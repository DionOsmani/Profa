using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class ExtraHour
    {
        public int HoursId { get; set; }
        public DateTime? HoursDate { get; set; }
        public int? HoursAmount { get; set; }
        public int StaffId { get; set; }

        public virtual staff Staff { get; set; } = null!;
    }
}
