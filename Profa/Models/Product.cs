using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string? ProductType { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
    }
}
