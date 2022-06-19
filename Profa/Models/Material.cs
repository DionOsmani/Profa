using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Material
    {
        public int MaterialId { get; set; }
        public string? MaterialType { get; set; }
        public int? Amount { get; set; }
        public string? BarCode { get; set; }
        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; } = null!;
    }
}
