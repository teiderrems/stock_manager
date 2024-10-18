using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public enum BillStatus
    {
        IN_PROGRESS,
        FINISHED
    }
    public class Bill:CommunProperties
    {

        public required List<Item> Items { get; set; }

        [Required]
        public required string Title { get; set; }


        public BillStatus Status { get; set; } = BillStatus.IN_PROGRESS;

        public required ApplicationUser Owner { get; set; }

        [Column(TypeName ="decimal(6,3)")]
        public decimal TotalAmount {  get; set; }= decimal.Zero;
    }
}
