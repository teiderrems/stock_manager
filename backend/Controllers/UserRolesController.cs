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
    public class UserRolesController(RoleManager<IdentityRole> _roleManager) : ControllerBase
    {




        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerator<RoleDto>>> GetAllRole()
        {   
            
            var roles=await _roleManager.Roles.Select(r=>new RoleDto(r)).ToListAsync();
            return Ok(roles);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IdentityRole>> GetRoleById(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);    //await _context.Roles.FindAsync(id);
            if (role == null) { 
                return NotFound();
            }
            return Ok(new RoleDto(role));
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<IdentityResult>> Post(CreateRoleDto role)
        {
            var temp = await _roleManager.FindByNameAsync(role.Name);//.FirstOrDefault(r=>r.Name==role.Name);
            if (temp!=null)
            {
                return CreatedAtAction(nameof(GetRoleById), new { id=temp.Id }, new RoleDto(temp));
            }
            var newRole=await _roleManager.CreateAsync(new IdentityRole() { Name = role.Name });
            try
            {
                return await _roleManager.CreateAsync(new IdentityRole() { Name = role.Name }); //CreatedAtAction(nameof(GetRoleById), new { id= newRole.Id }, new RoleDto(newRole.));
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
    }
}
