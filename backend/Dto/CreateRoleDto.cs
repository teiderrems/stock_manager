using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class CreateRoleDto
    {
        [Required]
        public required string Name { get; set; }
    }
}
