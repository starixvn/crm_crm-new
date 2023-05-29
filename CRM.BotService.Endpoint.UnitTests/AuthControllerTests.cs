namespace CRM.BotService.Endpoint.UnitTests
{
    using CRM.BotService.Core.Models;
    using CRM.BotService.Endpoint.Controllers;
    using CRM.BotService.Endpoint.ViewModel;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json.Linq;
    using NSubstitute;
    using Xunit;

    public class AuthControllerTests
    {
        private WebSettings webSettings;

        [Fact]
        public void Authenticate_InvalidUserOrPassword_ReturnBadRequestResult()
        {
            var controller = GetController();

            var userName = string.Empty;
            var password = string.Empty;

            var auth = new AuthViewModel
            {
                AppId = "ChatBotForLicensee",
                Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
            };

            webSettings.AppId = "AppCredentialId";
            webSettings.AppToken = "ZSI6IjMiLCJuYmYiOjE1";
            webSettings.Secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ";

            //Actual
            var actual = controller.Authenticate(auth);

            //Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actual);
            Assert.Equal("Username or password is incorrect", badRequestResult.Value);
        }

        [Fact]
        public void Authenticate_ValidUserAndPassword_ReturnOkObjectResult()
        {
            var controller = GetController();
            var auth = new AuthViewModel
            {
                AppId = "ChatBotForLicensee",
                Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
            };

            webSettings.AppId = "ChatBotForLicensee";
            webSettings.AppToken = "ZSI6IjMiLCJuYmYiOjE1";
            webSettings.Secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ";

            //Actual
            var actual = controller.Authenticate(auth);

            //Assert
            Assert.IsType<OkObjectResult>(actual);
        }

        private AuthController GetController()
        {
            webSettings = Substitute.For<WebSettings>();
            return new AuthController(webSettings);
        }
    }
}