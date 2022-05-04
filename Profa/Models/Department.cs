using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Department
    {
        public Department()
        {
            staff = new HashSet<staff>();
        }

        public int DepartmentId { get; set; }
        public string Specialisation { get; set; } = null!;
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; } = null!;

        public virtual ICollection<staff> staff { get; set; }
    }
}
