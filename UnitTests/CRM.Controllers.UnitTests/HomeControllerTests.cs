namespace CRM.Controllers.UnitTests
{
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using Xunit;

    public class HomeControllerTests
    {

        private ISessionService sessionService;
        private IUserService userService;
        private INapSession napSession;
        private INapSettings napSettings;
        private ICommonService commonService;
        private IOptionsSnapshot<AppSettings> appSettings;

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
            userService = Substitute.For<IUserService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            commonService = Substitute.For<ICommonService>();
            appSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
            return new HomeController(sessionService, userService, napSession, napSettings, commonService, appSettings);
        }

        #endregion Helpers
    }
}