using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser, IdentityRole<int>,int>(options)
    {
        public DbSet<Categorie> Categories { get; set; } = default!;

        public DbSet<Item> Items { get; set; } = default!;

        public DbSet<Picture> Images { get; set; }= default!;

        public DbSet<Comment> Comments { get; set; }=default!;

        public DbSet<Bill> Bills { get; set; }




        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Categorie>().HasIndex(c => c.Name).IsUnique();
            builder.Entity<Item>()
            .Navigation(p=>p.Image);

            builder.Entity<Item>()
            .Navigation<Categorie>(p=>p.Categories);

            builder.Entity<Item>()
            .Navigation<Comment>(p=>p.Comments);

            builder.Entity<Item>()
            .HasIndex(c => c.Name).IsUnique();
            builder.Entity<Picture>().HasIndex(c => c.FileName).IsUnique();

            builder.Entity<IdentityRole>()
            .HasIndex(r=>r.Name)
            .IsUnique();

            builder.Entity<ApplicationUser>().HasMany(u=>u.Roles)
            .WithMany();

            builder.Entity<ApplicationUser>().HasIndex(u=>u.Email).IsUnique();

            base.OnModelCreating(builder);
        }

    }
}
