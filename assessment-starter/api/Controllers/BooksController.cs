using System.Security.Claims;
using BookNest.Api.Data;
using BookNest.Api.DTOs;
using BookNest.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookNest.Api.Controllers;

[Authorize, ApiController, Route("api/books")]
public sealed class BooksController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub")!);

    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetAll() => await db.Books.Where(x => x.UserId == UserId).OrderBy(x => x.Title).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Book>> Get(int id) => await db.Books.SingleOrDefaultAsync(x => x.Id == id && x.UserId == UserId) is { } book ? Ok(book) : NotFound();

    [HttpPost]
    public async Task<ActionResult<Book>> Create(BookRequest request)
    {
        var book = new Book { Title = request.Title.Trim(), Author = request.Author.Trim(), PublishedDate = request.PublishedDate, UserId = UserId };
        db.Books.Add(book); await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Book>> Update(int id, BookRequest request)
    {
        var book = await db.Books.SingleOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (book is null) return NotFound();
        book.Title = request.Title.Trim(); book.Author = request.Author.Trim(); book.PublishedDate = request.PublishedDate;
        await db.SaveChangesAsync(); return Ok(book);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await db.Books.SingleOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (book is null) return NotFound();
        db.Books.Remove(book); await db.SaveChangesAsync(); return NoContent();
    }
}
