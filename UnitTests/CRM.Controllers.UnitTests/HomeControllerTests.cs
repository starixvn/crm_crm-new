namespace CRM.Controllers.UnitTests
{
    using AutoFixture;
    using CRM.Services;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class HomeControllerTests
    {

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
            return new HomeController();
        }

        #endregion Helpers
    }
}