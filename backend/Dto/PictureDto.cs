namespace backend.Dto
{
    public class PictureDto(int id, string? img, DateTime? ct, DateTime? ut)
    {
        public int Id { get; set; } = id;
        public string? ImageUrl { get; set; } = img;

        public DateTime? CreatedAt { get; set; } = ct;

        public DateTime? UpdatedAt { get; set; } = ut;
    }
}
