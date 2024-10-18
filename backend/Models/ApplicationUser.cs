using Microsoft.AspNetCore.Identity;
using System.ComponentModel;

namespace backend.Models
{
    public class ApplicationUser:IdentityUser<int>
    {
        public string? Firstname {  get; set; }
        public string? Lastname { get; set; }

        [DisplayName("Creation Date")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [DisplayName("Last Updated Date")]
        public DateTime? UpdatedAt { get; set; }

        public Picture? Profil { get; set; }

        public List<ApplicationUserRole>? Roles { get; set; }
    }
}
