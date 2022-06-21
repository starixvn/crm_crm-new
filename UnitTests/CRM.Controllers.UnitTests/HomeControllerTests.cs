namespace CRM.Controllers.UnitTests
{
    using AutoFixture;
    using CRM.Services;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {

        private IUserService userService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();

            // Act
            var actual = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(actual);
            Assert.Null(viewResult.ViewName);
        }

       
                   Url = "/test"
               }
            };

            var controller = GetController();
            homeService.EditMenuLanguage(Arg.Any<List<MenuItem>>()).Returns(currentUserMenu);

            //Act
            var result = controller.GettingUserMenu();

            //Assert
            Assert.Equal(result, currentUserMenu);
        }


        #region Helpers

        private HomeController GetController()
        {
            homeService = Substitute.For<IHomeService>();
            userService = Substitute.For<IUserService>();

            return new HomeController(homeService, userService);
        }

        #endregion Helpers
    }
}