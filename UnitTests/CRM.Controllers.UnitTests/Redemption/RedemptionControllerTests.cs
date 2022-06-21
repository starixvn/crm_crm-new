namespace CRM.Controllers.UnitTests.Redemption
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Redemption;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Redemption;
    using CRM.Models;
    using CRM.Models.Redemption;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Redemption;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class RedemptionControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private IBaseService baseService;
        private ISettingService settingService;
        private IRedemptionService redemptionService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var permission = (CustomerPermissionViewModel)viewResult.Model;
            Assert.Equal(2, permission.CustomerInfoPolicy);
            Assert.Equal(2, permission.CreateUpdateFeedbackPermission);
        }

        [Fact]
        public async Task GetLogsByCustomerId_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var logs = fixture.Create<IEnumerable<CustomerLogInfo>>();
            var criteria = fixture.Create<GetLogsByCustomerIdCriteria>();
            var controller = GetController();
            redemptionService.GetLogsByCustomerIdAsync(criteria).Returns(logs);

            // Act
            var result = await controller.GetLogsByCustomerId(criteria);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var redemptionLogs = jsonResult.Value;
            Assert.Equal(logs, redemptionLogs);
        }

        [Fact]
        public async Task GetAllStatus_WhenCalledWithParamTrue_ReturnAsExpectedResult()
        {
            // Arrange
            var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var currencies = fixture.Create<IEnumerable<BaseModel>>();
            var controller = GetController();
            settingService.GetStatusAsync(ViewTypeConstants.Redemption).Returns(statuses);
            settingService.GetCurrencyRedemptionAsync().Returns(currencies);

            // Act
            var result = await controller.GetAllStatus(true);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var statusResult = jsonResult.Value.GetType().GetProperty("statuses").GetValue(jsonResult.Value);
            var currenciesResult = jsonResult.Value.GetType().GetProperty("currencies").GetValue(jsonResult.Value);
            Assert.Equal(statusResult, statuses);
            Assert.Equal(currenciesResult, currencies);
        }

        [Fact]
        public async Task GetAllStatus_WhenCalledWithParamFalse_ReturnAsExpectedResult()
        {
            // Arrange
            var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var currencies = fixture.Create<IEnumerable<BaseModel>>();
            var controller = GetController();
            settingService.GetStatusAsync(ViewTypeConstants.Redemption).Returns(statuses);
            settingService.GetCurrencyRedemptionAsync().Returns(currencies);

            // Act
            var result = await controller.GetAllStatus(false);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var statusResult = jsonResult.Value.GetType().GetProperty("statuses").GetValue(jsonResult.Value);
            var currenciesResult = jsonResult.Value.GetType().GetProperty("currencies").GetValue(jsonResult.Value);
            Assert.Equal(statusResult, statuses);
            Assert.Equal(currenciesResult, currencies);
        }

        [Fact]
        public async Task GetLogById_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var log = fixture.Create<LogInfo>();
            var controller = GetController();
            redemptionService.GetLogByIdAsync(1).Returns(log);

            // Act
            var result = await controller.GetLogById(1);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var redemptionLog = jsonResult.Value;
            Assert.Equal(log, redemptionLog);
        }

        [Fact]
        public async Task EditRedemptionLog_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditRedemptionLogCommand>();
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
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.EditRedemptionLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        [Fact]
        public async Task CreateRedemptionLog_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<CreateRedemptionLogCommand>();
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
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.CreateRedemptionLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        #region Helpers

        private RedemptionController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            redemptionService = Substitute.For<IRedemptionService>();
            return new RedemptionController(napSession, napSettings, userService, redemptionService, settingService, baseService);
        }

        #endregion Helpers
    }
}
