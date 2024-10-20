using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Dto
{
    public class RoleDto(IdentityRole<int> role)
    {
        public int Id { get; set; } = role.Id;
        public string? Name { get; set; } = role.Name;
        public string? Description { get; set; }
    }
}
