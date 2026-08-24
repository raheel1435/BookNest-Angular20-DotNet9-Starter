namespace BookNest.Api.Models;

public sealed class Quote
{
    public int Id { get; set; }
    public required string Text { get; set; }
    public string? Author { get; set; }
    public int UserId { get; set; }
}
