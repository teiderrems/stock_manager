using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/categories")]
    [ApiController]
    
    public class CategorieController(ApplicationDbContext context, ILogger<CategorieController> logger,IEmailSender _emailSender) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<CategorieController> _logger = logger;
        private readonly IEmailSender _emailSender =_emailSender;

        [HttpGet(Name = "List Categorie")]
        public async Task<ActionResult<List<Categorie>>> GetAllCategorie()
        {
            _logger.LogInformation("Categorie List");
            return await _context.Categories.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Categorie>> GetCategorieById(int id)
        {
            try
            {
                var categorie = await _context.Categories.FindAsync(id);
                return categorie!=null?categorie:NotFound();
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CustomResponseBody>> AddCategorie(CreateCategorieDto categorie)
        {
            CustomResponseBody body;
            if (categorie==null)
            {
                body=new(false,[]);
                return NotFound(body); 
            }
            try {
                _context.Categories.Add(new Categorie() { Name=categorie.Name,Description=categorie.Description});
                await _context.SaveChangesAsync();
                body=new(true,[]);
                return Ok(body);
            }
            catch (Exception ex) { 
                body=new(false,[ex.Message]);
                return BadRequest(body);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<CustomResponseBody>> UpdateCategorie( int id,CategorieDto categorie)
        {
            CustomResponseBody body;
            if (categorie == null)
            {
                body=new(false,[]);
                return BadRequest(body);
            }
            
            try
            {
                if (categorie.Id==id)
                {
                    var result=_context.Categories.Update(new Categorie() { Name= categorie.Name!, Description=categorie.Description,Id= categorie.Id});
                    await _context.SaveChangesAsync();
                    body=new(true,[]);
                    return Ok(body);
                }
                else
                {
                    body=new(false,[]);
                    return NotFound(body);
                }
            }
            catch (Exception ex) {
                body=new(false,[ex.Message]);
                return BadRequest(body);
            }
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<CustomResponseBody>> DeleteCategorie(int id)
        {
            CustomResponseBody body;
            try
            {
                var cat = await _context.Categories.FindAsync(id);
                if (cat==null)
                {
                    _logger.LogWarning($" Categorie identified by id {id} don't exist in the Database");
                    body=new(false,[]);
                    return BadRequest(body);
                }
                var result = _context.Categories.Remove(cat);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Categorie Deleted successfully");
                body=new(true,[]);
                return Ok(body);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                body=new(false,[ex.Message]);
                return BadRequest(body);
            }
        }
    }
}
