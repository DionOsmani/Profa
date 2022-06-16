using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Profa.Models
{
    public partial class ProfaContext : DbContext
    {
        public ProfaContext()
        {
        }

        public ProfaContext(DbContextOptions<ProfaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bill> Bills { get; set; } = null!;
        public virtual DbSet<Branch> Branches { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<ExtraHour> ExtraHours { get; set; } = null!;
        public virtual DbSet<Issue> Issues { get; set; } = null!;
        public virtual DbSet<Machinery> Machineries { get; set; } = null!;
        public virtual DbSet<Material> Materials { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Report> Reports { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<StaffPayment> StaffPayments { get; set; } = null!;
        public virtual DbSet<Tool> Tools { get; set; } = null!;
        public virtual DbSet<Wood> Woods { get; set; } = null!;
        public virtual DbSet<staff> Staffs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-3RIK3NP\\SQLEXPRESS;Database=Profa;\nTrusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("Bill");

                entity.Property(e => e.BillId).HasColumnName("Bill_ID");

                entity.Property(e => e.CustomerId).HasColumnName("Customer_ID");

                entity.Property(e => e.PaymentDate)
                    .HasColumnType("date")
                    .HasColumnName("Payment_Date");

                entity.Property(e => e.ProductId).HasColumnName("Product_ID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Bill__Customer_I__656C112C");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Bill__Product_ID__6477ECF3");
            });

            modelBuilder.Entity<Branch>(entity =>
            {
                entity.ToTable("Branch");

                entity.Property(e => e.BranchId).HasColumnName("Branch_ID");

                entity.Property(e => e.BranchAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Branch_Address");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.CustomerId).HasColumnName("Customer_ID");

                entity.Property(e => e.CompanyAddress)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Company_Address");

                entity.Property(e => e.CompanyEmail)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Company_Email");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Company_Name");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("Department");

                entity.Property(e => e.DepartmentId).HasColumnName("Department_ID");

                entity.Property(e => e.BranchId).HasColumnName("Branch_ID");

                entity.Property(e => e.Specialisation)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.Departments)
                    .HasForeignKey(d => d.BranchId)
                    .HasConstraintName("FK__Departmen__Branc__38996AB5");
            });

            modelBuilder.Entity<ExtraHour>(entity =>
            {
                entity.HasKey(e => e.HoursId)
                    .HasName("PK__Extra_Ho__9BA162931DAF0417");

                entity.ToTable("Extra_Hours");

                entity.Property(e => e.HoursId).HasColumnName("Hours_ID");

                entity.Property(e => e.HoursAmount).HasColumnName("Hours_Amount");

                entity.Property(e => e.HoursDate)
                    .HasColumnType("date")
                    .HasColumnName("Hours_Date");

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.ExtraHours)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Extra_Hou__Staff__68487DD7");
            });

            modelBuilder.Entity<Issue>(entity =>
            {
                entity.HasKey(e => e.IssuesId)
                    .HasName("PK__Issues__03285EEB3FC6AB0C");

                entity.Property(e => e.IssuesId).HasColumnName("Issues_ID");

                entity.Property(e => e.Issues)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Issues__Staff_ID__619B8048");
            });

            modelBuilder.Entity<Machinery>(entity =>
            {
                entity.ToTable("Machinery");

                entity.Property(e => e.MachineryId).HasColumnName("Machinery_ID");

                entity.Property(e => e.DepartmentId).HasColumnName("Department_ID");

                entity.Property(e => e.MachineryName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Machinery_Name");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Machineries)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__Machinery__Depar__5165187F");
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.Property(e => e.MaterialId).HasColumnName("Material_ID");

                entity.Property(e => e.BarCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DepartmentId).HasColumnName("Department_ID");

                entity.Property(e => e.MaterialType)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Material_Type");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Materials)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__Materials__Depar__4E88ABD4");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("Product_ID");

                entity.Property(e => e.ProductType)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Product_Type");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.Property(e => e.ReportId).HasColumnName("Report_ID");

                entity.Property(e => e.Report1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Report");

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Reports__Staff_I__5441852A");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("Role_ID");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Role_Name");

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.Roles)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Roles__Staff_ID__49C3F6B7");
            });

            modelBuilder.Entity<StaffPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK__Staff_Pa__DA6C7FE160C418DD");

                entity.ToTable("Staff_Payments");

                entity.Property(e => e.PaymentId).HasColumnName("Payment_ID");

                entity.Property(e => e.PaymentDate)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Payment_Date");

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.StaffPayments)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Staff_Pay__Staff__571DF1D5");
            });

            modelBuilder.Entity<Tool>(entity =>
            {
                entity.Property(e => e.ToolId).HasColumnName("Tool_ID");

                entity.Property(e => e.DepartmentId).HasColumnName("Department_ID");

                entity.Property(e => e.ToolType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Tool_Type");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Tools)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__Tools__Departmen__5BE2A6F2");
            });

            modelBuilder.Entity<Wood>(entity =>
            {
                entity.ToTable("Wood");

                entity.Property(e => e.WoodId).HasColumnName("Wood_ID");

                entity.Property(e => e.BarCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.BranchId).HasColumnName("Branch_ID");

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.Woods)
                    .HasForeignKey(d => d.BranchId)
                    .HasConstraintName("FK__Wood__Branch_ID__5EBF139D");
            });

            modelBuilder.Entity<staff>(entity =>
            {
                entity.ToTable("Staff");

                entity.Property(e => e.StaffId).HasColumnName("Staff_ID");

                entity.Property(e => e.BranchId).HasColumnName("Branch_ID");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Gjinia)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Pass)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Phone_Number");

                entity.Property(e => e.Surname)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.BranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Staff__Branch_ID__3C69FB99");

                entity.HasMany(d => d.Departments)
                    .WithMany(p => p.staff)
                    .UsingEntity<Dictionary<string, object>>(
                        "Belong",
                        l => l.HasOne<Department>().WithMany().HasForeignKey("DepartmentId").HasConstraintName("FK__Belongs__Departm__403A8C7D"),
                        r => r.HasOne<staff>().WithMany().HasForeignKey("StaffId").HasConstraintName("FK__Belongs__Staff_I__3F466844"),
                        j =>
                        {
                            j.HasKey("StaffId", "DepartmentId").HasName("PK__Belongs__3380949E2621A84E");

                            j.ToTable("Belongs");

                            j.IndexerProperty<int>("StaffId").HasColumnName("Staff_ID");

                            j.IndexerProperty<int>("DepartmentId").HasColumnName("Department_ID");
                        });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
