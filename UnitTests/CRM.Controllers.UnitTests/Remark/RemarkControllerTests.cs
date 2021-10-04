namespace CRM.Controllers.UnitTests.Remark
{
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Remark;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Remark;
    using CRM.Models.Customer;
    using CRM.Models.Remark;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class RemarkControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private IRemarkService remarkService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);

            // Act
            var actual = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(actual);
            var permission = (GetPermissionCustomer)viewResult.Model;
            Assert.Equal(2, permission.CustomerInfoPolicy);
        }

        [Fact]
        public async Task GetRemarks_WhenCalled_ReturnAsExpectedResult()
        {
            //Arrange
            var remarks = fixture.Create<RemarkInfo>();
            var param = fixture.Create<GetRemarkCriteria>();
            var controller = GetController();
            remarkService.GetRemarkAsync(param).Returns(remarks);

            //Act
            var actual = await controller.GetRemarks(param);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var remarkInfo = jsonResult.Value;
            Assert.Equal(remarks, remarkInfo);
        }

        [Fact]
        public async Task EditRemarks_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var command = fixture.Create<EditRemarkCommand>();
            var commandResult = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            var controller = GetController();
            controller.ControllerContext.HttpContext = clientIP;
            remarkService.EditRemarkAsync(command).Returns(commandResult);

            //Act
            var actual = await controller.EditRemarks(command);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandActual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, commandActual);
        }

        #region Helpers

        private RemarkController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            remarkService = Substitute.For<IRemarkService>();
            return new RemarkController(napSession, napSettings, userService, remarkService);
        }

        #endregion Helpers
    }
}
