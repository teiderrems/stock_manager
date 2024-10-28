using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class UserRolesController(ApplicationDbContext context) : ControllerBase
    {


        private readonly ApplicationDbContext _context = context;




        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerator<RoleDto>>> GetAllRole()
        {   
            var roles=await _context.Roles.Select(r=>new RoleDto(r)).ToListAsync();
            return Ok(roles);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IdentityRole<int>>> GetRoleById(int id)
        {
            var role=await _context.Roles.FindAsync(id);
            if (role == null) { 
                return NotFound();
            }
            return Ok(new RoleDto(role));
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Post(IdentityRole<int> role)
        {
            var temp=_context.Roles.FirstOrDefault(r=>r.Name==role.Name);
            if (temp!=null)
            {
                return CreatedAtAction(nameof(GetRoleById), new { id=temp.Id }, new RoleDto(temp));
            }
            _context.Roles.Add(role);
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRoleById), new { id=role.Id }, new RoleDto(role));
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
    }
}
