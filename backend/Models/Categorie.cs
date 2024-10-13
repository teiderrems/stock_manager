using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Categorie:CommunProperties
    {
        [Required]
        public required string Name {  get; set; }

        public string? Description { get; set; }=string.Empty;

        public List<Item>? Items { get; set; }

        public override string ToString() { 
            return Name;
        }
    }
}
