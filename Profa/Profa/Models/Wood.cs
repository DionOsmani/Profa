using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Wood
    {
        public int WoodId { get; set; }
        public string? BarCode { get; set; }
        public int? Amount { get; set; }
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; } = null!;
    }
}
