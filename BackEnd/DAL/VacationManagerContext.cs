using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using Models.Domain;
using System;

namespace DAL
{
    public class VacationManagerContext : DbContext
    {
        public VacationManagerContext(DbContextOptions<VacationManagerContext> options)
                : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User_Role>()
             .HasKey(bc => new { bc.RoleId, bc.UserId });

            modelBuilder.Entity<User_ChechIn>()
             .HasKey(bc => new { bc.CheckInDateTime, bc.UserId });

            modelBuilder.Entity<Holiday>()
             .HasKey(bc => new { bc.HolidayId });

            modelBuilder.Entity<Vacation>()
             .HasKey(bc => new { bc.VacationId });

            modelBuilder.Entity<VacationStatus>()
             .HasKey(bc => new { bc.StatusId });

            modelBuilder.Entity<Vacation>()
             .HasOne(bc => bc.User)
             .WithMany(b => b.vacations)
             .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<Vacation>()
             .HasOne(bc => bc.VacationStatus)
             .WithMany(b => b.vacations)
             .HasForeignKey(bc => bc.StatusId);

            modelBuilder.Entity<User_Role>()
              .HasOne(bc => bc.Role)
              .WithMany(b => b.User_Role)
              .HasForeignKey(bc => bc.RoleId);

            modelBuilder.Entity<User_Role>()
              .HasOne(bc => bc.User)
              .WithMany(b => b.User_Role)
              .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<User_ChechIn>()
              .HasOne(bc => bc.User)
              .WithMany(b => b.User_ChechIns)
              .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<Role_Ability>()
              .HasKey(bc => new { bc.RoleId, bc.AbilityId });

            modelBuilder.Entity<Role_Ability>()
              .HasOne(bc => bc.Role)
              .WithMany(b => b.Role_Ability)
              .HasForeignKey(bc => bc.RoleId);

            modelBuilder.Entity<Role_Ability>()
              .HasOne(bc => bc.Ability)
              .WithMany(b => b.Role_Ability)
              .HasForeignKey(bc => bc.AbilityId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<Vacation> Vacations { get; set; }
        public DbSet<VacationStatus> VacationStatus { get; set; }
        public DbSet<User_Role> Users_Roles { get; set; }
        public DbSet<User_ChechIn> User_ChechIns { get; set; }
        public DbSet<Role_Ability> Roles_Abilities { get; set; }
    }
}
