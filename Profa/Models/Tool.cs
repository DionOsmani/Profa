using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Tool
    {
        public int ToolId { get; set; }
        public string? ToolType { get; set; }
        public int? Amount { get; set; }
        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; } = null!;
    }
}
