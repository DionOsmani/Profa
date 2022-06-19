using System;
using System.Collections.Generic;

namespace Profa.Models
{
    public partial class Role
    {

        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
        public int StaffId { get; set; }
        public virtual staff Staff { get; set; } = null!;
    }
}
