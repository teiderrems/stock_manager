using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using MR.EntityFrameworkCore.KeysetPagination;
using MR.AspNetCore.Pagination;
using backend.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPaginationService _paginationService;

        public ApplicationUsersController(ApplicationDbContext context, IPaginationService paginationService)
        {
            _context = context;
            _paginationService = paginationService;
        }

        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<KeysetPaginationResult<UserDto>>> GetUsers()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (!(user.Roles.Any(r => r.Name == "admin" || r.Name == "guest")))
            {
                return Unauthorized();
            }

            var _usersKeysetQuery = KeysetQuery.Build<ApplicationUser>(b => b.Descending(x => x.UserName!));//.Descending(x => x.Id)
            var usersPaginationResult = await _paginationService.KeysetPaginateAsync(
                _context.Users,
                _usersKeysetQuery,
                async id => await _context.Users.FindAsync(int.Parse(id)),
                query => query.Select((item) => new UserDto(item.Id, item.UserName, item.Firstname, item.Lastname,
                                                            item.Email, GetPictureUrl(item.Profil, HttpContext),
                                                            item.CreatedAt, item.UpdatedAt, GetRoles(item.Roles),
                                                            item.PhoneNumber))
                );

            return usersPaginationResult;
        }

        // GET: api/ApplicationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetApplicationUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new UserDto(user.Id, user.UserName, user.Firstname, user.Lastname, user.Email,
                               GetPictureUrl(user.Profil, HttpContext), user.CreatedAt, user.UpdatedAt,
                               GetRoles(user.Roles), user.PhoneNumber);
        }

        // PUT: api/ApplicationUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(int id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(applicationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ApplicationUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
        {
            _context.Users.Add(applicationUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/ApplicationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationUser(int id)
        {
            var applicationUser = await _context.Users.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(applicationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApplicationUserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private static string GetPictureUrl(Picture picture, HttpContext httpContext)
        {
            var imageUrl = $"{httpContext.Request.Protocol.Split('/')[0]}://{httpContext.Request.Host}/api/pictures/";
            List<string> ImageUrlList = [];
            if (picture != null)
            {
                imageUrl+= $"{picture.Id}";
            }
            return imageUrl;
        }

        private static List<string> GetRoles(List<ApplicationUserRole> roles)
        {
            List<string> roleList = [];
            foreach (var role in roles) {
                roleList.Add(role.Name);
            }
            return roleList;
        }
    }
}
