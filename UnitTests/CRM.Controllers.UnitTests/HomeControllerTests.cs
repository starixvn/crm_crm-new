namespace CRM.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {
        private IPermissionService permissionService;

        [Fact]
        public async Task Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();

            // Act
            var actual = await controller.Index();

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