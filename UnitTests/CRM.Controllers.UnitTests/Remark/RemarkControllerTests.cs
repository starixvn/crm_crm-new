namespace CRM.Controllers.UnitTests.Remark
{
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Remark;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Remark;
    using CRM.Models.Remark;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class RemarkControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private IRemarkService remarkService;
        private IPermissionService permissionService;
        private ICustomerService customerService;

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
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host).Returns(true);
            customerService.HasHostPermissionOnCustIdAsync(Arg.Any<int>()).Returns(true);
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
            remarkService = Substitute.For<IRemarkService>();
            permissionService = Substitute.For<IPermissionService>();
            customerService = Substitute.For<ICustomerService>();
            return new RemarkController(napSession, remarkService, permissionService, customerService);
        }

        #endregion Helpers
    }
}