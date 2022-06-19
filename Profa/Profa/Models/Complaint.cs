using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Complaint
    {
        public int ComplaintId { get; set; }
        public string? Complaints { get; set; }
        public int StaffId { get; set; }

        public virtual staff Staff { get; set; } = null!;
    }
}
