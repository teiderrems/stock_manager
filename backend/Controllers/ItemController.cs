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
    [Authorize]
    public class ItemController(ApplicationDbContext context, ILogger<ItemController> logger, IPaginationService paginationService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<ItemController> _logger = logger;

        private readonly IPaginationService _paginationService = paginationService;

        [HttpGet(Name = "List Item")]
        [AllowAnonymous]
        public async Task<ActionResult<KeysetPaginationResult<ItemDto>>> GetAllItem()
        {

            var imageUrl = $"{HttpContext.Request.Protocol.Split('/')[0]}://{HttpContext.Request.Host}/api/pictures/";
            _logger.LogInformation("Item List");
            var categorie = HttpContext.Request.Query["categorie"].ToString();
            var name =HttpContext.Request.Query["name"].ToString();
            IQueryable<Item>? Items = null;
            if (categorie.Length>0)
            {
                var cat = _context.Categories.FirstOrDefault(c => c.Name == categorie);
                Items = _context.Items.Include(i => i.Comments).AsSplitQuery().Include(i => i.Categories)
                .AsSplitQuery().Include(i => i.Image).AsSplitQuery().Where(item => item!.Categories!.Contains(cat!)).AsSplitQuery();
            }
            else
            {
                Items = _context.Items.Include(i => i.Comments).AsSplitQuery().Include(i => i.Categories)
                .AsSplitQuery().Include(i => i.Image).AsSplitQuery();
            }

            if (name.Length>0)
            {
                Items = Items.Where(item => item.Name.Contains(name));
            }

            var minPrice=HttpContext.Request.Query["minPrice"].ToString();
            var maxPrice = HttpContext.Request.Query["maxPrice"].ToString();

            if (minPrice.Length > 0 && double.Parse(minPrice) is double)
            {
                Items = Items.Where(item => item.MinPrice <= double.Parse(minPrice));
            }
            if (maxPrice.Length>0 && double.Parse(maxPrice) is double)
            {
                Items = Items.Where(item => item.MaxPrice <= double.Parse(maxPrice));
            }

            var _itemsKeysetQuery = KeysetQuery.Build<Item>(b => b.Descending(x => x.Name));//.Descending(x => x.Id)
            var itemsPaginationResult = await _paginationService.KeysetPaginateAsync(
                 Items!,
                _itemsKeysetQuery,
                async id => await _context.Items.FindAsync(int.Parse(id)),
                query => query.Select((item) => new ItemDto(
                    item.Id, item.Name,
                    item.StockQuantity,
                    item.MinPrice,
                    item.MaxPrice,
                    item.Description,
                    item.Image!=null?$"{imageUrl}{item.Image!.Id}":"",
                    item.Categories, item.Comments,
                    item.CreatedAt, item.UpdatedAt, item.ExpirationAt))
                );
            return itemsPaginationResult;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<ItemDto>> GetItemById(int id)
        {
            try
            {
                var imageUrl = $"{HttpContext.Request.Protocol.Split('/')[0]}://{HttpContext.Request.Host}/api/pictures/";
                var item = await _context.Items.Include(i => i.Comments).AsSplitQuery()
                    .Include(i => i.Categories).AsSplitQuery()
                    .Include(i => i.Image).AsSplitQuery().FirstOrDefaultAsync(i=>i.Id==id);
                
                return item != null ? new ItemDto(item.Id, item.Name,
                    item.StockQuantity,
                    item.MinPrice,
                    item.MaxPrice,
                    item.Description, item.Image!=null?$"{imageUrl}{item.Image!.Id}":"",
                    item.Categories, item.Comments,
                    item.CreatedAt, item.UpdatedAt, item.ExpirationAt) : NotFound();
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(CreateItemDto item)
        {
            
            if (item == null)
            {
                return NotFound();
            }
            List<Categorie> categories = [];

            item.Categories!.ForEach(c =>
            {
                categories.Add(_context.Categories.Find(c)!);
            });

            var newItem = new Item
            {
                Name = item.Name,
                Image = await _context.Images.FindAsync(item.Picture),
                Categories = categories,
                Comments = [],
                Description = item.Description,
                ExpirationAt = item.ExpirationAt,
                StockQuantity = item.StockQuantity,
                MinPrice = item.MinPrice,
                Price = 0.0,
                MaxPrice = item.MaxPrice
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

        public async Task<ActionResult<Item>> UpdateItem(int id, UpdateItemDto item)
        {
            
            if (item == null)
            {
                return BadRequest();
            }

            try
            {
                if (item.Id == id)
                {
                    var oldItem = _context.Items.FirstOrDefault(i=>i.Id==id);
                    oldItem!.Description = oldItem.Description == item.Description ? oldItem.Description : item.Description;
                    oldItem.StockQuantity = oldItem.StockQuantity == item.StockQuantity ? oldItem.StockQuantity : item.StockQuantity;
                    oldItem.MinPrice = oldItem.MinPrice == item.MinPrice ? oldItem.MinPrice : item.MinPrice;
                    oldItem.Price = oldItem.Price == item.Price ? oldItem.Price : item.Price;
                    oldItem.MaxPrice = oldItem.MaxPrice == item.MaxPrice ? oldItem.MaxPrice : item.MaxPrice;
                    oldItem.UpdatedAt = DateTime.Now;

                    var result = _context.Items.Update(oldItem);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteItem(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return NotFound(ex);
            }
        }
    }
}
