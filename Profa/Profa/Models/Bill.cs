using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Bill
    {
        public int BillId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
