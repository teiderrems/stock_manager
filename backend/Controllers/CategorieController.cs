﻿using backend.Data;
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
        public async Task<IActionResult> AddCategorie(CreateCategorieDto categorie)
        {
            if (categorie==null)
            {
                return NotFound(); 
            }
            try {
                _context.Categories.Add(new Categorie() { Name=categorie.Name,Description=categorie.Description});
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategorieById), new { categorie.Id }, categorie);
            }
            catch (Exception ex) { 
                return BadRequest(ex);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Categorie>> UpdateCategorie( int id,CategorieDto categorie)
        {
            
            if (categorie == null)
            {
                return BadRequest();
            }
            
            try
            {
                if (categorie.Id==id)
                {
                    var result=_context.Categories.Update(new Categorie() { Name= categorie.Name!, Description=categorie.Description,Id= categorie.Id});
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
                _logger.LogInformation("Categorie Deleted successfully");
                return Ok(result);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return NotFound(ex);
            }
        }
    }
}
