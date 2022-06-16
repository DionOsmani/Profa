using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class StaffPayment
    {
        public int PaymentId { get; set; }
        public string? PaymentDate { get; set; }
        public int StaffId { get; set; }

        public virtual staff Staff { get; set; } = null!;
    }
}
