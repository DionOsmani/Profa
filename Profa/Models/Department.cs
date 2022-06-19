using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Department
    {
        public Department()
        {
            Machineries = new HashSet<Machinery>();
            Materials = new HashSet<Material>();
            Tools = new HashSet<Tool>();
            staff = new HashSet<staff>();
        }

        public int DepartmentId { get; set; }
        public string Specialisation { get; set; } = null!;
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; } = null!;
        public virtual ICollection<Machinery> Machineries { get; set; }
        public virtual ICollection<Material> Materials { get; set; }
        public virtual ICollection<Tool> Tools { get; set; }

        public virtual ICollection<staff> staff { get; set; }
    }
}
