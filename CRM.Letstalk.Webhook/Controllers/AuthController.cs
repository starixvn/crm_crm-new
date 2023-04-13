namespace CRM.Letstalk.Webhook.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Webhook.ViewModel;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    public class AuthController : Controller
    {
        private readonly WebSettings webSettings;

        public AuthController(WebSettings webSettings)
        {
            this.webSettings = webSettings;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/authenticate")]
        public IActionResult Authenticate([FromBody] AuthViewModel auth)
        {
            if (IsValidCredential(auth))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(webSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(),
                    Expires = DateTime.UtcNow.AddDays(webSettings.ExpirationByDay),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var sercurityToken = tokenHandler.CreateToken(tokenDescriptor);
                string token = tokenHandler.WriteToken(sercurityToken);

                return Ok(new { AccessToken = token });
            }
            else
            {
                return Unauthorized();
            }
        }

        private bool IsValidCredential(AuthViewModel auth)
        => auth.AppId.Equals(webSettings.AppId) && Convert.ToBase64String(Encoding.UTF8.GetBytes(webSettings.AppToken)).Equals(auth.Token);
    }
}