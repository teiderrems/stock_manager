using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser, ApplicationUserRole,int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Categorie> Categories { get; set; } = default!;

        public DbSet<Item> Items { get; set; } = default!;

        public DbSet<Picture> Pictures { get; set; }= default!;

        public DbSet<Comment> Comments { get; set; }=default!;

        public DbSet<Bill> Bills { get; set; }

        public override DbSet<ApplicationUserRole> Roles {  get; set; }


        public override DbSet<ApplicationUser> Users {  get; set; } = default!;




        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Categorie>().HasIndex(c => c.Name).IsUnique();
            builder.Entity<Picture>().HasIndex(c => c.FileName).IsUnique();

            builder.Entity<ApplicationUser>().HasAlternateKey(u => new {u.Firstname,u.Lastname});

            base.OnModelCreating(builder);
        }

    }
}
