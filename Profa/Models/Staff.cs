using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class staff
    {
        public staff()
        {
            Departments = new HashSet<Department>();
        }

        public int StaffId { get; set; }
        public string Firstname { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string? Email { get; set; }
        public int? Age { get; set; }
        public string? Gjinia { get; set; }
        public string? Pass { get; set; }
        public string? PhoneNumber { get; set; }
        public double? Wage { get; set; }
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; } = null!;

        public virtual ICollection<Department> Departments { get; set; }
    }
}
