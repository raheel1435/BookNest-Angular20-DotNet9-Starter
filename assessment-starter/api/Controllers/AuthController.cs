using BookNest.Api.Data;
using BookNest.Api.DTOs;
using BookNest.Api.Models;
using BookNest.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookNest.Api.Controllers;

[ApiController, Route("api/auth")]
public sealed class AuthController(AppDbContext db, TokenService tokens, IPasswordHasher<User> hasher) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        var username = request.Username.Trim().ToLowerInvariant();
        if (await db.Users.AnyAsync(x => x.Username == username))
            return Conflict(new { message = "Username is already registered." });

        var user = new User { Username = username, PasswordHash = string.Empty };
        user.PasswordHash = hasher.HashPassword(user, request.Password);
        user.Quotes = StarterQuotes.Select(x => new Quote { Text = x.Text, Author = x.Author, UserId = user.Id }).ToList();
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return Ok(new AuthResponse(tokens.Create(user), user.Username));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var username = request.Username.Trim().ToLowerInvariant();
        var user = await db.Users.SingleOrDefaultAsync(x => x.Username == username);
        if (user is null || hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            return Unauthorized(new { message = "Invalid username or password." });
        return Ok(new AuthResponse(tokens.Create(user), user.Username));
    }

    private static readonly (string Text, string Author)[] StarterQuotes =
    [
        ("The only way to do great work is to love what you do.", "Steve Jobs"),
        ("Simplicity is the soul of efficiency.", "Austin Freeman"),
        ("First, solve the problem. Then, write the code.", "John Johnson"),
        ("It always seems impossible until it's done.", "Nelson Mandela"),
        ("Learning never exhausts the mind.", "Leonardo da Vinci")
    ];
}
