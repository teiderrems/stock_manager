namespace backend.Dto
{
    public class PictureDto
    {
        public int Id { get; set; }
        public string? ImageUrl { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get;set; }

        public PictureDto( int id,string? img,DateTime? ct,DateTime? ut) { 
            this.Id = id;
            this.UpdatedAt = ut;
            this.CreatedAt = ct;
            this.ImageUrl = img;
        } 
    }
}
