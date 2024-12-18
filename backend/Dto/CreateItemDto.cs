namespace backend.Dto
{
    public class CreateItemDto
    {
        public required string Name {  get; set; }
        public string? Description { get; set; }
        public List<int>? Categories { get; set; }
        public DateOnly? ExpirationAt { get; set; }
        public int Picture { get; set; }
        public int StockQuantity { get; set; }
        public double MinPrice { get; set; }
        public double Price { get; set; }
        public double MaxPrice { get; set; }


        public override string ToString()
        {
            return Name;
        }
    }
}