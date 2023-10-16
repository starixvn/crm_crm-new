namespace CRM.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Services;
    using CRM.Services.Customer;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {
        private IPermissionService permissionService;
        private ISessionService sessionService;
        private ICustomerService customerService;

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
            sessionService = Substitute.For<ISessionService>();
            customerService = Substitute.For<ICustomerService>();
            return new HomeController(permissionService, sessionService, customerService);
        }

        #endregion Helpers
    }
}