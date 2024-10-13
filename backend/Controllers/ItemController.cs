using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ItemController> _logger;

        public ItemController(ApplicationDbContext context, ILogger<ItemController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet(Name = "List Item")]
        public async Task<ActionResult<List<ItemDto>>> GetAllItem()
        {
            
            _logger.LogInformation("Item List");
            return await _context.Items.Select((item)=> new ItemDto(
                item.Id,item.Name,
                item.StockQuantity,
                item.MinPrice,
                item.MaxPrice,
                item.Description,
                GetPictureUrl(item,HttpContext),
                item.Categories,item.Comments,
                item.CreatedAt,item.UpdatedAt,item.ExpirationAt)).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ItemDto>> GetItemById(int id)
        {
            try
            {

                var item = await _context.Items.FindAsync(id);
                return item!=null? new ItemDto(item.Id, item.Name,
                    item.StockQuantity,
                    item.MinPrice,
                    item.MaxPrice,
                    item.Description, GetPictureUrl(item,HttpContext),
                    item.Categories, item.Comments,
                    item.CreatedAt, item.UpdatedAt, item.ExpirationAt) : NotFound();
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(Item item)
        {
            Console.WriteLine(item);
            if (item == null)
            {
                return NotFound();
            }
            try
            {
                _context.Items.Add(item);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetItemById), new { Id = item.Id }, item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Item>> UpdateItem( int id,Item Item)
        {
            if (Item == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (Item.Id==id)
                {
                    var result=_context.Items.Update(Item);
                    await _context.SaveChangesAsync();
                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex) {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                Console.WriteLine(item);
                if (item == null)
                {
                    _logger.LogWarning($" Item identified by id {id} don't exist in the Database");
                    return BadRequest();
                }
                var result = _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                _logger.LogInformation(result.ToString());
                return Ok(result);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return NotFound(ex);
            }
        }

        private static string[] GetPictureUrl(Item item,HttpContext httpContext)
        {
            var imageUrl = $"{httpContext.Request.Protocol.Split('/')[0]}://{httpContext.Request.Host}/api/pictures/";
            List<string> ImageUrlList = [];
            if (item != null && item.Pictures != null)
            {
                item.Pictures.ForEach(p => ImageUrlList.Add($"{imageUrl}{p!.Id}"));
            }
            return [..ImageUrlList];
        }
    }
}
