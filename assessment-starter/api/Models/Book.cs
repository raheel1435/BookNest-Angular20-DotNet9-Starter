namespace BookNest.Api.Models;

public sealed class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public DateOnly? PublishedDate { get; set; }
    public int UserId { get; set; }
}
