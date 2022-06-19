using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Report
    {
        public int ReportId { get; set; }
        public string? Report1 { get; set; }
        public int StaffId { get; set; }

        public virtual staff Staff { get; set; } = null!;
    }
}
