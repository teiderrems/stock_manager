using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/pictures")]
    [ApiController]
    [AllowAnonymous]
    public class PictureController(ApplicationDbContext context, ILogger<PictureController> logger) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<PictureController> _logger = logger;

        [HttpGet(Name = "List Picture")]
        public async Task<ActionResult<List<PictureDto>>> GetAllPicture()
        {
            var imageUrl = $"{HttpContext.Request.Protocol.Split('/')[0]}://{HttpContext.Request.Host}/api/pictures/";
            _logger.LogInformation("Picture List");
            return await _context.Images.Select(p=>new PictureDto(p.Id,$"{imageUrl}{p.Id}",p.CreatedAt,p.UpdatedAt)).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Picture>> GetPictureById(int id)
        {
            try
            {
                var picture = await _context.Images.FindAsync(id);
                return picture == null ? NotFound(): File(picture.Content, picture.FileType);
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
            var alreadyExist=await _context.Images.FirstOrDefaultAsync(p=>p.FileName==picture.FileName);
            if (alreadyExist!=null)
            {
                return Ok(alreadyExist.Id);
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

                var image = await _context.Images.AddAsync(current);
                _context.Images.Add(current);
                await _context.SaveChangesAsync();
                return Ok(current.Id); //CreatedAtAction(nameof(Picture), new { Id = current.Id }, current);
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
                var result = _context.Images.Update(current);
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
                var picture = await _context.Images.FindAsync(id);

                if (picture==null)
                {
                    _logger.LogWarning($" Picture identified by id {id} don't exist in the Database");
                    return BadRequest();
                }
                var result = _context.Images.Remove(picture);
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
            {
                var filePath=Path.Combine("backend","images","profile.jpg");
                using (FileStream fileStream = new(filePath, FileMode.Open, FileAccess.Read))
                {
                    // Le FileStream est maintenant un stream que tu peux utiliser
                    // Par exemple, lire le contenu du fichier :
                    using var memoryStream = new MemoryStream();

                    await fileStream.CopyToAsync(memoryStream);
                    return memoryStream.ToArray();
                    // Ou, si tu veux juste manipuler le stream, tu peux le passer à d'autres méthodes qui attendent un Stream.
                }
            }
            else
            {
                using var memoryStream = new MemoryStream();

                await formFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
