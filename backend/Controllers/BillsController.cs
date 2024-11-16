using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using MR.EntityFrameworkCore.KeysetPagination;
using MR.AspNetCore.Pagination;
using backend.Dto;
using Microsoft.AspNetCore.Authorization;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;

namespace backend.Controllers
{
    
    [ApiController]
    [Authorize]
    public class BillsController(ApplicationDbContext context, ILogger<BillsController> logger, IPaginationService paginationService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<BillsController> _logger = logger;
        private readonly IPaginationService _paginationService = paginationService;

        // GET: api/Bills
        [HttpGet]
        [Route("api/users/{owner}/bills")]
        public async Task<ActionResult<KeysetPaginationResult<BillDto>>> GetBills(string owner)
        {
            
            var pdfUrl = $"{HttpContext.Request.Protocol.Split('/')[0]}://{HttpContext.Request.Host}/api/users/{owner}/bills";
            
            var billsKeysetQuery = KeysetQuery.Build<Bill>(b => b.Descending(x => x.Title));//.Descending(x => x.Id)
            var billsPaginationResult = await _paginationService.KeysetPaginateAsync(
                _context.Bills.Include(b=>b.Owner).AsSplitQuery().Where(b=>b.Owner.Id==owner),
                billsKeysetQuery,
                async id => await _context.Bills.FindAsync(int.Parse(id)),
                query => query.Select((item) => new BillDto(item.Id, GetItemName(item.Items), item.Title, item.Status, GetFullName(item.Owner), 
                item.TotalAmount, item.CreatedAt, item.UpdatedAt,$"{pdfUrl}/{item.Id}"))
                );
            return billsPaginationResult;
        }

        // GET: api/Bills/5
        [HttpGet("api/users/{owner:int}/bills/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetBill(int id,string owner)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id==owner);

            var bill = await _context.Bills.Include(b => b.Owner).AsSplitQuery().FirstOrDefaultAsync(b=>b.Id==id && b.Owner.Id==owner);

            if (bill == null)
            {
                return NotFound();
            }
            
            return GetFile(bill,user);
        }

        // PUT: api/Bills/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("api/users/{owner:int}/bills/{id}")]
        
        public async Task<IActionResult> PutBill(string owner, int id, Bill bill)
        {
            
            if (id != bill.Id || bill.Owner.Id!=owner)
            {
                return BadRequest();
            }

            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bills
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("api/users/{ownerId:int}/bills")]
        
        public async Task<ActionResult<Bill>> PostBill(string ownerId,Bill bill)
        {
            
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBill", new { owner=ownerId,id = bill.Id }, bill);
        }

        // DELETE: api/Bills/5
        [HttpDelete("api/users/{owner:int}/bills/{id}")]
        
        public async Task<IActionResult> DeleteBill(int id,string owner)
        {
            var bill = await _context.Bills.Include(b => b.Owner).AsSplitQuery().FirstOrDefaultAsync(b => b.Id == id && b.Owner.Id == owner);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BillExists(int id)
        {
            return _context.Bills.Any(e => e.Id == id);
        }


        private List<string> GetItemName(List<Item> items)
        {
            return items.Select(item => item.Name).ToList();
        }

        private string? GetFullName(ApplicationUser user)
        {
            return $"{user.Firstname} {user.Lastname}"??user.UserName;
        }

        private static byte[] GeneratePdf(Bill bill)
        {
            using (var memoryStream = new MemoryStream())
            {
                // Créer un document PDF
                PdfWriter writer = new(memoryStream);
                PdfDocument pdf = new(writer);
                Document document = new(pdf);

                // Ajouter des informations sur la personne dans le document PDF
                document.Add(new Paragraph($"Title :\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{bill.Title}"));
                document.Add(new Paragraph("Name\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"));
                bill.Items.ForEach((i)=>{
                    document.Add(new Paragraph($"{i.Name}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{i.MaxPrice}"));
                });
                document.Add(new Paragraph($"TotalAmount :\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{bill.TotalAmount}"));
                document.Add(new Paragraph($"Date :\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{bill.CreatedAt}"));

                // Fermer le document
                document.Close();

                // Retourner le flux en tant que tableau de bytes
                return memoryStream.ToArray();
            }
        }

        private ActionResult GetFile(Bill bill,ApplicationUser? user){
            // var downloadName=$"Bill_{GetFullName(user!)}_{bill.CreatedAt.ToShortDateString()}.pdf";
            var content=GeneratePdf(bill);
            return File(content,"application/pdf");
        }
    }
}
