using backend.Models;


namespace backend.Dto
{
    public class BillDto(int id, List<string>? items, string title, BillStatus? status, string? owner, decimal? totalAmount, DateTime? createdAt, DateTime? updatedAt, string? pdf)
    {
        public int Id { get; set; } = id;

        public List<string>? Items { get; set; } = items;


        public string? Title { get; set; } = title;


        public BillStatus? Status { get; set; } = status;

        public string? Owner { get; set; } = owner;

        public decimal? TotalAmount { get; set; } = totalAmount;

        public string? PdfUrl { get; set; } = pdf;

        public DateTime? CreatedAt { get; set; } = createdAt;

        public DateTime? UpdatedAt { get; set; } = updatedAt;
    }
}
