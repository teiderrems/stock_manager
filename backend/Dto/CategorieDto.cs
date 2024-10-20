using backend.Models;

namespace backend.Dto
{
    public class CategorieDto(Categorie categorie)
    {
        public int Id { get; set; } = categorie.Id;
        public string? Name { get; set; } = categorie.Name;
        public string? Description { get; set; } = categorie.Description;
    }
}
