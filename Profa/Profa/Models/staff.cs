using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class staff
    {
        public staff()
        {
            ExtraHours = new HashSet<ExtraHour>();
            Issues = new HashSet<Issue>();
            Reports = new HashSet<Report>();
            Roles = new HashSet<Role>();
            StaffPayments = new HashSet<StaffPayment>();
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
        public int? Salary { get; set; }

        public virtual Branch Branch { get; set; } = null!;
        public virtual ICollection<ExtraHour> ExtraHours { get; set; }
        public virtual ICollection<Issue> Issues { get; set; }
        public virtual ICollection<Report> Reports { get; set; }
        public virtual ICollection<Role> Roles { get; set; }
        public virtual ICollection<StaffPayment> StaffPayments { get; set; }

        public virtual ICollection<Department> Departments { get; set; }
    }
}
