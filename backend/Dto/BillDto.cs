using backend.Models;


namespace backend.Dto
{
    public class BillDto
    {
        public int Id { get; set; }

        public List<string>? Items { get; set; }

        
        public string? Title { get; set; }


        public BillStatus? Status { get; set; }

        public string? Owner { get; set; }

        public decimal? TotalAmount { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get;set; }

        public BillDto(int id, List<string>? items, string title, BillStatus? status, string? owner, decimal? totalAmount, DateTime? createdAt, DateTime? updatedAt)
        {
            Id = id;
            Items = items;
            Title = title;
            Status = status;
            Owner = owner;
            TotalAmount = totalAmount;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
        }


    }
}
