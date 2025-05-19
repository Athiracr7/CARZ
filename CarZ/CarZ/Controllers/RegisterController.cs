using CarZ.Data;
using CarZ.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RegisterController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Check if email already exists
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest("Email is already registered.");
        }

        // Hash password (simple example)
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var newUser = new User
        {
            FullName = request.Name,
            Email = request.Email,
            PasswordHash = hashedPassword,
            Role = request.Role  // default role
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok("Registration successful");
    }
}
