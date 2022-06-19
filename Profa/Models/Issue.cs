using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Issue
    {
        public int IssuesId { get; set; }
        public string? Issues { get; set; }
        public int StaffId { get; set; }

        public virtual staff Staff { get; set; } = null!;
    }
}
