using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public abstract class CommunProperties
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [DisplayName("Creation Date")]
        public DateTime CreatedAt { get; set; }= DateTime.Now;

        [DisplayName("Last Updated Date")]
        public DateTime? UpdatedAt { get; set; }
    }
}
