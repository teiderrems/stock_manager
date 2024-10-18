using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using MR.EntityFrameworkCore.KeysetPagination;
using MR.AspNetCore.Pagination;
using backend.Dto;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    
    [ApiController]
    [Authorize]
    public class BillsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<BillsController> _logger;
        private readonly IPaginationService _paginationService;
        public BillsController(ApplicationDbContext context, ILogger<BillsController> logger, IPaginationService paginationService)
        {
            _context = context;
            _logger = logger;
            _paginationService = paginationService;
        }

        // GET: api/Bills
        [HttpGet]
        [Route("api/users/{owner:int}/bills")]
        public async Task<ActionResult<KeysetPaginationResult<BillDto>>> GetBills(int owner)
        {
            var user=await _context.Users.FirstOrDefaultAsync(u=>u.UserName== User.Identity!.Name);
            if (user.Id!=owner || !(user.Roles.Any(r=>r.Name=="admin" || r.Name=="guest")))
            {
                return Unauthorized();
            }
            var _billsKeysetQuery = KeysetQuery.Build<Bill>(b => b.Descending(x => x.Title));//.Descending(x => x.Id)
            var billsPaginationResult = await _paginationService.KeysetPaginateAsync(
                _context.Bills.Where(b=>b.Owner.Id==owner),
                _billsKeysetQuery,
                async id => await _context.Bills.FindAsync(int.Parse(id)),
                query => query.Select((item) => new BillDto(item.Id, GetItemName(item.Items), item.Title, item.Status, GetFullName(item.Owner), item.TotalAmount, item.CreatedAt, item.UpdatedAt))
                );

            return billsPaginationResult;
        }

        // GET: api/Bills/5
        [HttpGet("api/users/{owner:int}/bills/{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id,int owner)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (user.Id != owner || !(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
            var bill = await _context.Bills.FirstOrDefaultAsync(b=>b.Id==id && b.Owner.Id==owner);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        // PUT: api/Bills/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("api/users/{owner:int}/bills/{id}")]
        public async Task<IActionResult> PutBill(int owner, int id, Bill bill)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
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
        public async Task<ActionResult<Bill>> PostBill(int ownerId,Bill bill)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBill", new { owner=ownerId,id = bill.Id }, bill);
        }

        // DELETE: api/Bills/5
        [HttpDelete("api/users/{owner:int}/bills/{id}")]
        public async Task<IActionResult> DeleteBill(int id,int owner)
        {
            var bill = await _context.Bills.FirstOrDefaultAsync(b => b.Id == id && b.Owner.Id == owner);
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

        private string GetFullName(ApplicationUser user)
        {
            return $"{user.Firstname} {user.Lastname}"??user.UserName!;
        }
    }
}
