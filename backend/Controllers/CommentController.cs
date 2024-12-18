﻿using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MR.AspNetCore.Pagination;
using MR.EntityFrameworkCore.KeysetPagination;

namespace backend.Controllers
{
    [Route("api/items")]
    [ApiController]
    [Authorize]
    public class CommentController(ApplicationDbContext context, ILogger<CommentController> logger, IPaginationService paginationService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<CommentController> _logger = logger;
        private readonly IPaginationService _paginationService = paginationService;

        [HttpGet("{itemId:int}/comments",Name = "List Comment")]
        [AllowAnonymous]
        public async Task<KeysetPaginationResult<CommentDto>> GetAllComment(int itemId)
        {
            _logger.LogInformation("Comment List");

            var commentsKeysetQuery = KeysetQuery.Build<Comment>(b => b.Descending(x => x.Title));//.Descending(x => x.Id)
            var commentsPaginationResult = await _paginationService.KeysetPaginateAsync(
                _context.Comments.Where(c=>c.Item.Id==itemId).Include(c=>c.Owner).AsSingleQuery(),
                commentsKeysetQuery,
                async id => await _context.Comments.FindAsync(int.Parse(id)),
                query => query.Select((item) => new CommentDto(item))
                );

            return commentsPaginationResult;
        }

        [HttpGet("{itemId:int}/comments/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<CommentDto>> GetCommentById(int itemId, int id)
        {
            try
            {
                var comment = await _context.Comments.Include(c => c.Owner).AsSingleQuery().FirstOrDefaultAsync(c=>c.Id==id && c.Item.Id==itemId);
                return comment!=null?new CommentDto(comment) :NotFound();
            }
            catch (Exception ex)
            {

                return NotFound(ex);
            }
        }

        [HttpPost("{itemId:int}/comments")]
        public async Task<ActionResult> AddComment(int itemId,CreateCommentDto? comment)
        {
            if (comment==null)
            {
                return NotFound(); 
            }
            try {
                var currentComment = new Comment
                {
                    Title = comment.Title!,
                    Message=comment.Content,
                    Item= (await _context.Items.FirstOrDefaultAsync(c => c.Id == itemId))!,
                    Owner= (await _context.Users.FirstOrDefaultAsync(c => c.UserName == User!.Identity!.Name))!
                };

                _context.Comments.Add(currentComment);
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            catch (Exception ex) { 
                return BadRequest(ex);
            }
        }

        [HttpPut("{itemId:int}/comments/{id:int}")]
        public async Task<ActionResult<Comment>> UpdateComment(int itemId, int id,Comment? comment)
        {
            if (comment == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (comment.Id==id && comment.Item.Id==itemId)
                {
                    var result=_context.Comments.Update(comment);
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

        [HttpDelete("{itemId:int}/comments/{id:int}")]
        public async Task<IActionResult> DeleteComment(int itemId,int id)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(c=>c.Id==id && c.Item.Id==itemId);
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
