using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Machinery
    {
        public int MachineryId { get; set; }
        public string? MachineryName { get; set; }
        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; } = null!;
    }
}
