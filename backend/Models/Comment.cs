using System.Reflection;

namespace backend.Models
{
    public class Comment(string title,string? message) : CommunProperties
    {
        public string Title { get; set; } = title;
        public string? Message { get; set; } = message;

        public Item item { get; set; }
    }
}
