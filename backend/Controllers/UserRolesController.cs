using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {


        private readonly ApplicationDbContext _context;

        public UserRolesController(ApplicationDbContext context)
        {
            _context = context;
        }




        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUserRole>>> GetAllRole()
        {
            return await _context.Roles.ToListAsync();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUserRole>> GetRoleById(int id)
        {
            var role=await _context.Roles.FindAsync(id);
            if (role == null) { 
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<ApplicationUserRole>> Post(ApplicationUserRole role)
        {
            _context.Roles.Add(role);
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRoleById), new { id=role.Id }, role);
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
    }
}
