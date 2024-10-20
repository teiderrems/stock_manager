namespace backend.Dto
{
    public class CreateItemDto
    {
        public required string Name {  get; set; }
        public string? Description { get; set; }
        public List<int>? Categories { get; set; }
        public DateOnly? ExpirationAt { get; set; }
        public List<int>? Pictures { get; set; }
        public int StockQuantity { get; set; }
        public double MinPrice { get; set; }
        public double Price { get; set; }
        public double MaxPrice { get; set; }
    }
}