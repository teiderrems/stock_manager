using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CommentController> _logger;

        public CommentController(ApplicationDbContext context, ILogger<CommentController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet(Name = "List Comment")]
        public async Task<ActionResult<List<Comment>>> GetAllComment()
        {
            _logger.LogInformation("Comment List");
            return await _context.Comments.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Comment>> GetCommentById(int id)
        {
            try
            {
                var comment = await _context.Comments.FindAsync(id);
                return comment!=null?comment:NotFound();
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            if (comment==null)
            {
                return NotFound(); 
            }
            try {
                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCommentById), new { Id = comment.Id }, comment);
            }
            catch (Exception ex) { 
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Comment>> UpdateComment( int id,Comment Comment)
        {
            if (Comment == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (Comment.Id==id)
                {
                    var result=_context.Comments.Update(Comment);
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
        public async Task<IActionResult> DeleteComment(int id)
        {
            try
            {
                var comment = await _context.Comments.FindAsync(id);
                if (comment == null)
                {
                    _logger.LogWarning($" Comment identified by id {id} don't exist in the Database");
                    return BadRequest();
                }
                var result = _context.Comments.Remove(comment);
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
