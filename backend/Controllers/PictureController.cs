using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/pictures")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PictureController> _logger;

        public PictureController(ApplicationDbContext context, ILogger<PictureController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet(Name = "List Picture")]
        public async Task<ActionResult<List<PictureDto>>> GetAllPicture()
        {
            var imageUrl = $"{HttpContext.Request.Protocol.Split('/')[0]}://{HttpContext.Request.Host}/api/pictures/";
            _logger.LogInformation("Picture List");
            return await _context.Pictures.Select(p=>new PictureDto(p.Id,$"{imageUrl}{p.Id}",p.CreatedAt,p.UpdatedAt)).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Picture>> GetPictureById(int id)
        {
            try
            {
                var Picture = await _context.Pictures.FindAsync(id);
                return Picture == null ? NotFound(): File(Picture.Content, Picture.FileType);
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPicture(IFormFile picture)
        {

            if (picture == null)
            {
                return NotFound();
            }
            try
            {
                var Content = await ConvertToByteArray(picture);
                Picture current = new()
                {
                    FileName = picture.FileName,
                    FileType = picture.ContentType,
                    Content = Content
                };

                var image = await _context.Pictures.AddAsync(current);
                _context.Pictures.Add(current);
                await _context.SaveChangesAsync();
                return Ok(current); //CreatedAtAction(nameof(Picture), new { Id = current.Id }, current);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Picture>> UpdatePicture( int id,IFormFile picture)
        {
            if (picture == null)
            {
                return BadRequest();
            }
            try
            {
                var Content = await ConvertToByteArray(picture);
                Picture current = new()
                {
                    FileName = picture.FileName,
                    FileType = picture.ContentType,
                    Content = Content,
                    Id=id
                };
                var result = _context.Pictures.Update(current);
                await _context.SaveChangesAsync();
                return Ok(result);
            }
            catch (Exception ex) {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            try
            {
                var picture = await _context.Pictures.FindAsync(id);

                if (picture==null)
                {
                    _logger.LogWarning($" Picture identified by id {id} don't exist in the Database");
                    return BadRequest();
                }
                var result = _context.Pictures.Remove(picture);
                await _context.SaveChangesAsync();
                _logger.LogInformation(result.ToString());
                return Ok(result);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return NotFound(ex);
            }
        }

        private async Task<byte[]> ConvertToByteArray(IFormFile formFile)
        {
            if (formFile == null || formFile.Length == 0)
                return null;
            using (var memoryStream = new MemoryStream())
            {
                await formFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
