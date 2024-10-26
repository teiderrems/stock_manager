using backend.Models;

namespace backend.Dto
{
    public class ItemDto(int id, string? n, int sq, double mp, double map,
        string? d, string? iu, List<Categorie>? categories,
        List<Comment>? comments, DateTime? ct, DateTime? ut, DateOnly? ed)
    {
        public int? Id { get; set; } = id;
        public string? Name { get; set; } = n;

        public string? Description { get; set; } = d;

        public string? ImageUrl { get; set; } = iu;

        public List<CategorieDto>? Categories { get; set; } = categories!.Select(c => new CategorieDto(c)).ToList();
        public List<CommentDto>? Comments { get; set; } = comments!.Select(c => new CommentDto(c)).ToList();
        public DateTime? CreatedAt { get; set; } = ct;
        public DateTime? UpdatedAt { get; set; } = ut;
        public DateOnly? ExpirationDate { get; set; } = ed;

        public double MinPrice { get; set; } = mp;
        public double MaxPrice { get; set; } = map;
        public int StockQuantity { get; set; } = sq;
    }
}
