using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Item:CommunProperties
    {
        [Required]
        public required string Name {  get; set; }

        public string? Description { get; set; } = string.Empty;

        public List<Categorie>? Categories { get; set; }

        [DataType(DataType.Date),DisplayName("Expiration Date")]
        public DateOnly? ExpirationAt { get; set; }

        public List<Picture>? Pictures { get; set; }

        public List<Comment>? Comments { get; set; }

        public int StockQuantity { get; set; } = 0;

        [Column(TypeName = "decimal(10,4)")]
        [Required]
        public double MinPrice { get; set; } = 0.0;

        [Column(TypeName = "decimal(10,4)")]
        [Required]
        public double Price { get; set; } = 0.0;

        [Column(TypeName ="decimal(10,4)")]
        [Required]
        public double MaxPrice { get; set; } = 0.0;


        public override string ToString()
        {
            return Name;
        }
    }
}
