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

        public virtual DbSet<Branch> Branches { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
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
            modelBuilder.Entity<Branch>(entity =>
            {
                entity.ToTable("Branch");

                entity.Property(e => e.BranchId).HasColumnName("Branch_ID");

                entity.Property(e => e.BranchAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Branch_Address");
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

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("Product_ID");

                entity.Property(e => e.ProductType)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Product_Type");
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
