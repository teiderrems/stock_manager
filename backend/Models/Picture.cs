using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Picture:CommunProperties
    {
        [Required]
        public required string FileName {  get; set; }

        [Required]
        public required string FileType { get; set; }

        [Required]
        public required byte[] Content { get; set; }
    }
}
