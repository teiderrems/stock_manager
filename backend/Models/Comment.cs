using System.Reflection;

namespace backend.Models
{
    public class Comment : CommunProperties
    {
        public required string  Title { get; set; }
        public string? Message { get; set; }

        public required Item Item { get; set; }

        public  ApplicationUser? Owner { get; set; }
    }
}
