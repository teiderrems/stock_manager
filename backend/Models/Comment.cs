using System.Reflection;

namespace backend.Models
{
    public class Comment(string title,string? message) : CommunProperties
    {
        public string Title { get; set; } = title;
        public string? Message { get; set; } = message;

        public required Item Item { get; set; }
    }
}
