using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Dto
{
    public class RoleDto(IdentityRole role)
    {
        public string? Id { get; set; } = role.Id;
        public string? Name { get; set; } = role.Name;
        public string? Description { get; set; }
    }
}
