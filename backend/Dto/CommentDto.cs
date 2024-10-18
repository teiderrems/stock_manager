using backend.Models;

namespace backend.Dto
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public string? Message { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get;set; }

        public CommentDto(Comment comment)
        {
            Id = comment.Id;
            Title = comment.Title;
            Message = comment.Message;
            CreatedAt = comment.CreatedAt;
            UpdatedAt = comment.UpdatedAt;
        }
    }
}
