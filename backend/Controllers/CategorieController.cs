using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/categories")]
    [ApiController]
    
    public class CategorieController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CategorieController> _logger;

        public CategorieController(ApplicationDbContext context, ILogger<CategorieController> logger)
        {
            _context = context;
            _logger = logger;
        }


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
        public async Task<IActionResult> AddCategorie(Categorie categorie)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
            if (categorie==null)
            {
                return NotFound(); 
            }
            try {
                _context.Categories.Add(categorie);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategorieById), new { Id = categorie.Id }, categorie);
            }
            catch (Exception ex) { 
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Categorie>> UpdateCategorie( int id,Categorie categorie)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
            if (categorie == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (categorie.Id==id)
                {
                    var result=_context.Categories.Update(categorie);
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
        [Authorize]
        public async Task<IActionResult> DeleteCategorie(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }
            try
            {
                var cat = await _context.Categories.FindAsync(id);
                if (cat==null)
                {
                    _logger.LogWarning($" Categorie identified by id {id} don't exist in the Database");
                    return BadRequest();
                }
                var result = _context.Categories.Remove(cat);
                await _context.SaveChangesAsync();
                _logger.LogInformation(result.ToString());
                return Ok(result);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return NotFound(ex);
            }
        }
    }
}
