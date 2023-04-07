
namespace CRM.Letstalk.Webhook.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using CRM.Letstalk.Core.Models;
    using Microsoft.Extensions.Options;

    public class AuthController : Controller
    {
        private readonly TelegramAppSettings telegramAppSettings;
        private readonly string invalidUsernameOrPasswordText = "Username or password is incorrect";

        public AuthController(IOptions<TelegramAppSettings> telegramAppSettings)
        {
            this.telegramAppSettings = telegramAppSettings.Value;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/authenticate")]
        public ObjectResult Authenticate(string username, string password)
        {
            if (IsValidCredential(username, password))
            {
                var jwtToken = GenerateAccessToken(username);
                return Ok(jwtToken);
            }
            else
            {
                return BadRequest(invalidUsernameOrPasswordText);
            }
        }

        private JwtToken GenerateAccessToken(string username)
        {
            var jwtToken = new JwtToken();
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(telegramAppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, username)
                    }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            jwtToken.Token = tokenHandler.WriteToken(token);
            jwtToken.ValidFrom = token.ValidFrom;
            jwtToken.ValidTo = token.ValidTo;

            return jwtToken;
        }

        private bool IsValidCredential(string username, string password)
        {
            return username.Equals(telegramAppSettings.AppCredentialId, StringComparison.InvariantCultureIgnoreCase)
                && password.Equals(telegramAppSettings.AppCredentialPassword, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
