using InventarioApi.DTOs;
using InventarioApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioApi.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly JwtService _jwtService;

    public AuthController(IConfiguration config, JwtService jwtService)
    {
        _config = config;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var validUsername = _config["AdminCredentials:Username"];
        var validPassword = _config["AdminCredentials:Password"];

        if (request.Username != validUsername || request.Password != validPassword)
        {
            return Unauthorized(new { 
                message = "Usuario o contraseña incorrectos",
                status = false
            });
        }

        var (token, expiresAt) = _jwtService.GenerateToken(request.Username);

        return Ok(new LoginResponse
        {
            Token = token,
            ExpiresAt = expiresAt,
            Status = true
        });
    }
}
