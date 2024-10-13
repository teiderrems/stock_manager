using backend.Models;

namespace backend.Dto
{
    public class ItemDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }

        public string[]? ImageUrl { get; set; }

        public List<Categorie>? Categories { get; set; }
        public List<Comment>? Comments { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateOnly? ExpirationDate { get; set; }

        public double MinPrice { get; set; } = 0.0;
        public double MaxPrice { get; set; }= 0.0;
        public int StockQuantity { get; set; } = 0;

        public ItemDto( int id, string? n,int sq,double mp,double map,
            string? d, string[]? iu, List<Categorie>? categories, 
            List<Comment>? comments, DateTime? ct, DateTime? ut, DateOnly? ed) {
            this.Id = id;
            this.Name = n;
            this.Description = d;
            this.ImageUrl = iu;
            this.Categories = categories;
            this.Comments = comments;
            this.CreatedAt = ct;
            this.UpdatedAt = ut;
            this.ExpirationDate = ed;
            this.MinPrice = mp;
            this.MaxPrice = map;
            this.StockQuantity = sq;

        }
    }
}
