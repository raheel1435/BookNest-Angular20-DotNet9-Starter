using System.Security.Claims;
using BookNest.Api.Data;
using BookNest.Api.DTOs;
using BookNest.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookNest.Api.Controllers;

[Authorize, ApiController, Route("api/quotes")]
public sealed class QuotesController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub")!);

    [HttpGet]
    public async Task<List<Quote>> GetAll() => await db.Quotes.Where(x => x.UserId == UserId).OrderBy(x => x.Id).ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Quote>> Create(QuoteRequest request)
    {
        var quote = new Quote { Text = request.Text.Trim(), Author = request.Author?.Trim(), UserId = UserId };
        db.Quotes.Add(quote); await db.SaveChangesAsync(); return Ok(quote);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Quote>> Update(int id, QuoteRequest request)
    {
        var quote = await db.Quotes.SingleOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (quote is null) return NotFound();
        quote.Text = request.Text.Trim(); quote.Author = request.Author?.Trim();
        await db.SaveChangesAsync(); return Ok(quote);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var quote = await db.Quotes.SingleOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (quote is null) return NotFound();
        db.Quotes.Remove(quote); await db.SaveChangesAsync(); return NoContent();
    }
}
