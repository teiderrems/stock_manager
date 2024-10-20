using backend.Models;

namespace backend.Dto
{
    public class CommentDto(Comment comment)
    {
        public int Id { get; set; } = comment.Id;
        public string? Title { get; set; } = comment.Title;

        public string? Message { get; set; } = comment.Message;

        public DateTime? CreatedAt { get; set; } = comment.CreatedAt;

        public DateTime? UpdatedAt { get; set; } = comment.UpdatedAt;
    }
}
