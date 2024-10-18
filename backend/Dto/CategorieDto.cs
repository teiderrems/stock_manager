using backend.Models;

namespace backend.Dto
{
    public class CategorieDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public CategorieDto(Categorie categorie) { 
            Id = categorie.Id;
            Name = categorie.Name;
            Description = categorie.Description;
        }
    }
}
