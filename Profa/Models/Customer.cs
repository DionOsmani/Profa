using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Bills = new HashSet<Bill>();
        }

        public int CustomerId { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyEmail { get; set; }
        public string? CompanyAddress { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
