namespace backend.Dto
{
    public class UpdateItemDto
    {
        public int Id {  get; set; }
        public string? Description { get; set; }
        public int StockQuantity { get; set; }
        public double MinPrice { get; set; }
        public double Price { get; set; }
        public double MaxPrice { get; set; }
    }
}