using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MR.AspNetCore.Pagination;
using MR.EntityFrameworkCore.KeysetPagination;

namespace backend.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemController(ApplicationDbContext context, ILogger<ItemController> logger, IPaginationService paginationService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<ItemController> _logger = logger;

        private readonly IPaginationService _paginationService = paginationService;

        [HttpGet(Name = "List Item")]
        public async Task<ActionResult<KeysetPaginationResult<ItemDto>>> GetAllItem()
        {
            
            _logger.LogInformation("Item List");

            var _itemsKeysetQuery = KeysetQuery.Build<Item>(b => b.Descending(x =>x.Name));//.Descending(x => x.Id)
            var itemsPaginationResult = await _paginationService.KeysetPaginateAsync(
                _context.Items,
                _itemsKeysetQuery,
                async id => await _context.Items.FindAsync(int.Parse(id)),
                query=>query.Select((item) => new ItemDto(
                    item.Id, item.Name,
                    item.StockQuantity,
                    item.MinPrice,
                    item.MaxPrice,
                    item.Description,
                    GetPictureUrl(item, HttpContext),
                    item.Categories, item.Comments,
                    item.CreatedAt, item.UpdatedAt, item.ExpirationAt))
                );

            return itemsPaginationResult;
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
        [Authorize]
        public async Task<IActionResult> AddItem(CreateItemDto item)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!user!.Roles!.Any(r => r.Name == "admin" || r.Name == "guest"))
            {
                return Unauthorized();
            }
            if (item == null)
            {
                return NotFound();
            }
            List<Categorie> categories=[];
            List<Picture> pictures=[];

            item.Categories!.ForEach(c=>{
                categories.Add(_context.Categories.Find(c)!);
            });
            item.Pictures!.ForEach(p=>{
                pictures.Add(_context.Pictures.Find(p)!);
            });

            var newItem=new Item{
                Name=item.Name,
                Pictures=pictures,
                Categories=categories,
                Comments=[],
                Description=item.Description,
                ExpirationAt=item.ExpirationAt,
                StockQuantity=item.StockQuantity,
                MinPrice=item.MinPrice,
                Price=0.0,
                MaxPrice=item.MaxPrice
            };

            try
            { 
                _context.Items.Add(newItem);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Item>> UpdateItem( int id,UpdateItemDto item)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!user!.Roles!.Any(r => r.Name == "admin" || r.Name == "guest"))
            {
                return Unauthorized();
            }
            if (item == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (item.Id==id)
                {
                    var oldItem=_context.Items.Find(id);
                    oldItem!.Description=oldItem.Description==item.Description?oldItem.Description:item.Description;
                    oldItem.StockQuantity=oldItem.StockQuantity==item.StockQuantity?oldItem.StockQuantity:item.StockQuantity;
                    oldItem.MinPrice=oldItem.MinPrice==item.MinPrice?oldItem.MinPrice:item.MinPrice;
                    oldItem.Price=oldItem.Price==item.Price?oldItem.Price:item.Price;
                    oldItem.MaxPrice=oldItem.MaxPrice==item.MaxPrice?oldItem.MaxPrice:item.MaxPrice;
                    oldItem.UpdatedAt=DateTime.Now;
                
                    var result=_context.Items.Update(oldItem);
                    await _context.SaveChangesAsync();
                    return Ok();
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
        [Authorize]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!user!.Roles!.Any(r => r.Name == "admin" || r.Name == "guest"))
            {
                return Unauthorized();
            }
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
