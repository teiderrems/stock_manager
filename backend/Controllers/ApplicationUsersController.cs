using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using MR.EntityFrameworkCore.KeysetPagination;
using MR.AspNetCore.Pagination;
using backend.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Elfie.Extensions;

namespace backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class ApplicationUsersController(ApplicationDbContext context, IPaginationService paginationService, UserManager<ApplicationUser> _userManager,IEmailSender emailSender) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IPaginationService _paginationService = paginationService;
        private readonly UserManager<ApplicationUser> _userManager= _userManager;
        private readonly IEmailSender _emailSender=emailSender;

        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<KeysetPaginationResult<UserDto>>> GetUsers()
        {
            IQueryable<ApplicationUser>? Users = null;
            var role = HttpContext.Request.Query["role"].ToString();
            if (role == null)
            {
                Users = _context.Users.Include(u => u.Profil).AsSplitQuery().Include(u => u.Roles).AsSplitQuery();
            }
            else
            {
                Users = _context.Users.Include(u => u.Profil).AsSplitQuery().Include(u => u.Roles).AsSplitQuery().Where(u => u.Roles!.Contains(new IdentityRole<int>() { Name = role })).AsSplitQuery();
            }

            var _usersKeysetQuery = KeysetQuery.Build<ApplicationUser>(b => b.Descending(x => x.Email!));//.Descending(x => x.Id)
            var usersPaginationResult = await _paginationService.KeysetPaginateAsync(
                Users,
                _usersKeysetQuery,
                async id => await _context.Users.FindAsync(int.Parse(id)),
                query => query.Select((item) => new UserDto(item.Id, item.UserName, item.Firstname, item.Lastname,
                                                            item.Email, GetPictureUrl(item.Profil!, HttpContext),
                                                            item.CreatedAt, item.UpdatedAt, GetRoles(item.Roles!),
                                                            item.PhoneNumber))
                );

            return usersPaginationResult;
        }

        // GET: api/ApplicationUsers/5
        [HttpGet("{id:int}")]
        // [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetApplicationUser(int id)
        {
            var user = await _context.Users.Include(u=>u.Profil).AsSplitQuery().Include(u => u.Roles).AsSplitQuery().FirstOrDefaultAsync(u=>u.Id==id);

            if (user == null)
            {
                return NotFound();
            }

            return new UserDto(user.Id, user.UserName, user.Firstname, user.Lastname, user.Email,
                               GetPictureUrl(user.Profil!, HttpContext), user.CreatedAt, user.UpdatedAt,
                               GetRoles(user.Roles!), user.PhoneNumber);
        }

        // GET: api/ApplicationUsers/remi
        
        [HttpGet("{username}")]
        // [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetApplicationUserByUsername(string username)
        {
            var user = await _context.Users.Include(u => u.Profil).AsSplitQuery().Include(u => u.Roles).AsSplitQuery().FirstOrDefaultAsync(u=>u.UserName==username);

            if (user == null)
            {
                return NotFound();
            }
            return new UserDto(user.Id, user.UserName, user.Firstname, user.Lastname, user.Email,
                               GetPictureUrl(user.Profil!, HttpContext), user.CreatedAt, user.UpdatedAt,
                               GetRoles(user.Roles), user.PhoneNumber);
        }

        // PUT: api/ApplicationUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(int id, UpdateUserDto applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            } 

            var user=await _context.Users.FindAsync(id);
            if (user!.Profil!.Id!=applicationUser.PictureId)
            {
                var picture = await _context.Images.FirstOrDefaultAsync(p => p.Id == applicationUser.PictureId);
                user.Profil=picture;
            }

            var roles=GetRoles(user.Roles);
            applicationUser.Roles!.ForEach(r=>{

                if(!isIn(roles,r)){
                    user.Roles!.Add(new IdentityRole<int>{
                        Name=r
                    });
                }

            });

            user.UserName=user.UserName!=applicationUser.Username?applicationUser.Username:user.UserName;
            user.Firstname=user.Firstname!=applicationUser.Firstname?applicationUser.Firstname:user.Firstname;
            user.Lastname=user.Lastname!=applicationUser.Lastname?applicationUser.Lastname:user.Lastname;
            user.Email=user.Email!=applicationUser.Email?applicationUser.Email:user.Email;
            user.PhoneNumber=user.PhoneNumber!=applicationUser.PhoneNumber?applicationUser.PhoneNumber:user.PhoneNumber;
            user.UpdatedAt=DateTime.Now;

            _context.Entry(user).State = EntityState.Modified;

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
        //[AllowAnonymous]
        public async Task<ActionResult<UserDto>> PostApplicationUser(CreateUserDto applicationUser)
        {
            
            var picture = await _context.Images.FirstOrDefaultAsync(p => p.Id == applicationUser.PictureId);

            List<IdentityRole<int>> roles=[];
            applicationUser.Roles!.ForEach(id=>{
                roles.Add(_context.Roles.Find(id)!);
            });

            var user = new ApplicationUser
            {
                Roles = roles,
                UserName = applicationUser.Email,
                Firstname = applicationUser.Firstname,
                Lastname = applicationUser.Lastname,
                Email = applicationUser.Email,
                PhoneNumber = applicationUser.PhoneNumber,
                Profil = picture,
                NormalizedEmail = applicationUser.Email!.ToUpper(),
                NormalizedUserName = applicationUser.Email!.ToUpper(),
                EmailConfirmed = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
             var currentUser=await _userManager.AddPasswordAsync(user, "Toto1234;");

            var message = new Message([applicationUser.Email], "Confirm your email", $"Please use these informations email={applicationUser.Email} and password=<h2>Toto1234;</h2> for your first login", null);

            await _emailSender.SendEmailAsync(message);

            return CreatedAtAction("GetApplicationUser", new { id = user.Id }, new UserDto(user.Id, user.UserName, user.Firstname, user.Lastname, user.Email,
                             GetPictureUrl(user.Profil!, HttpContext), user.CreatedAt, user.UpdatedAt,
                             GetRoles(user.Roles), user.PhoneNumber));
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
            if (picture != null)
            {
                imageUrl+= $"{picture.Id}";
                return imageUrl;
            }
            return "";
        }

        private static List<string> GetRoles(List<IdentityRole<int>>? roles)
        {
            List<string> roleList = [];
            if(roles!=null && roles.Count>0){
                foreach (var role in roles) {
                    roleList.Add(role.Name!);
                }
            }
            return roleList;
        }

        private static bool isIn(List<string> liste,string val){

            for( int i=0;i<liste.Count;i++){
                if (liste[i]==val)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
