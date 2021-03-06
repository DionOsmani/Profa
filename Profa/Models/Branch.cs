using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Branch
    {
        public Branch()
        {
            Departments = new HashSet<Department>();
            Woods = new HashSet<Wood>();
            staff = new HashSet<staff>();
        }

        public int BranchId { get; set; }
        public string BranchAddress { get; set; } = null!;

        public virtual ICollection<Department> Departments { get; set; }
        public virtual ICollection<Wood> Woods { get; set; }
        public virtual ICollection<staff> staff { get; set; }
    }
}
