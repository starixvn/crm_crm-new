namespace CRM.Controllers.UnitTests
{
    using AutoFixture;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {

        private ISessionService sessionService;
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


        #region Helpers

        private HomeController GetController()
        {
            sessionService = Substitute.For<ISessionService>();

            return new HomeController(sessionService);
        }

        #endregion Helpers
    }
}