using System.ComponentModel.DataAnnotations;

namespace BookNest.Api.DTOs;

public sealed record RegisterRequest(
    [Required, MinLength(3), MaxLength(50)] string Username,
    [Required, MinLength(8), MaxLength(100)] string Password);

public sealed record LoginRequest([Required] string Username, [Required] string Password);
public sealed record AuthResponse(string Token, string Username);

public sealed record BookRequest(
    [Required, MaxLength(200)] string Title,
    [Required, MaxLength(150)] string Author,
    DateOnly? PublishedDate);

public sealed record QuoteRequest(
    [Required, MaxLength(500)] string Text,
    [MaxLength(150)] string? Author);
