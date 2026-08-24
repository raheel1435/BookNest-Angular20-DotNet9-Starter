namespace BookNest.Api.Models;

public sealed class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public List<Book> Books { get; set; } = [];
    public List<Quote> Quotes { get; set; } = [];
}
