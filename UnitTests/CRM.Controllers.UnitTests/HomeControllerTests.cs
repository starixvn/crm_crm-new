namespace CRM.Controllers.UnitTests
{
    using CRM.Core.Models;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {
        private IPermissionService permissionService;

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
            permissionService = Substitute.For<IPermissionService>();
            return new HomeController(permissionService);
        }

        #endregion Helpers
    }
}