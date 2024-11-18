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
    public class UserRolesController(ApplicationDbContext context,RoleManager<IdentityRole> roleManager) : ControllerBase
    {


        private readonly ApplicationDbContext _context = context;




        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerator<RoleDto>>> GetAllRole()
        {   
            var roles=await roleManager.Roles.Select(r=>new RoleDto(r)).ToListAsync();
            return Ok(roles);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IdentityRole>> GetRoleById(string id)
        {
            // var role=await _context.Roles.FindAsync(id);
            var role=await roleManager.FindByIdAsync(id);
            if (role == null) { 
                return NotFound(new CustomResponseBody(false,[]));
            }
            return Ok(new RoleDto(role));
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult> Post(IdentityRole role)
        {
            var temp=_context.Roles.FirstOrDefault(r=>r.Name==role.Name);
            if (temp!=null)
            {
                return Ok(new CustomResponseBody(true,[]));
            }
            try
            {
                return Ok(await roleManager.CreateAsync(role));
            }
            catch (Exception ex) { 
                return BadRequest(new CustomResponseBody(true,[ex.Message]));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id){
            try
            {
                var role=await roleManager.FindByIdAsync(id);
                if (role!=null)
                {
                    return Ok(await roleManager.DeleteAsync(role));
                }
                return NotFound(new CustomResponseBody(false,[]));
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(new CustomResponseBody(false,[ex.Message]));
            }
        }
    }
}
