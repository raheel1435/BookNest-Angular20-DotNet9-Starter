using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookNest.Api.Models;
using Microsoft.IdentityModel.Tokens;

namespace BookNest.Api.Services;

public sealed class TokenService(IConfiguration configuration)
{
    public string Create(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
            configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims,
            expires: DateTime.UtcNow.AddHours(2), signingCredentials: credentials));
    }
}
