namespace CRM.Controllers.UnitTests.Dashboard
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Dashboard;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Dashboard;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Dashboard;
    using CRM.Models.Redemption;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Dashboard;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class DashboardControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private ISettingService settingService;
        private IDashboardService dashboardService;
        private IPermissionService permissionService;


        [Fact]
        public async Task GetCustomerRemarks_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<GetCustomerRemarksCriteria>();
            var customerRemarks = fixture.Create<IEnumerable<string>>();
            var controller = GetController();
            dashboardService.GetCustomerRemarksAsync(criteria).Returns(customerRemarks);

            // Act
            var result = await controller.GetLastFiveSpecialRemarks(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result).Value;
            Assert.Equal(customerRemarks, jsonResult);
        }

        [Fact]
        public async Task GetRedemptionLogs_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<GetRedemptionLogsCriteria>();
            var redemptionLogs = fixture.Create<IEnumerable<CustomerLogInfo>>();
            var controller = GetController();
            dashboardService.GetRedemptionLogsAsync(criteria).Returns(redemptionLogs);

            // Act
            var result = await controller.GetRedemptionLogs(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result).Value;
            Assert.Equal(redemptionLogs, jsonResult);
        }

        [Fact]
        public async Task GetCommunicationLogs_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<GetCommunicationLogsCriteria>();
            var communicationLogs = fixture.Create<IEnumerable<CommunicationLog>>();
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var controller = GetController();
            dashboardService.GetCommunicationLogsAsync(criteria).Returns(communicationLogs);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.GetCommunicationLogs(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result).Value;
            var logs = jsonResult.GetType().GetProperty("data").GetValue(jsonResult);
            var mainCate = jsonResult.GetType().GetProperty("mainCategories").GetValue(jsonResult);
            Assert.Equal(communicationLogs, logs);
            Assert.Equal(mainCategories, mainCate);
        }

        [Fact]
        public async Task GetCustomerInfoVerify_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<GetCustomerInfoVerifyCriteria>();
            var customerInfoVerify = fixture.Create<CustomerInfoVerify>();
            var controller = GetController();
            dashboardService.GetCustomerInfoVerifyAsync(criteria).Returns(customerInfoVerify);

            // Act
            var result = await controller.GetCustomerInfoVerify(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result).Value;
            Assert.Equal(customerInfoVerify, jsonResult);
        }

        [Fact]
        public async Task EditCustomerVerify_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditCustomerVerifyCommand>();
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
            dashboardService.EditCustomerVerifyAsync(command).Returns(commandResult);

            // Act
            var result = await controller.EditCustomerVerify(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        #region Helpers

        private DashboardController GetController()
        {
            napSession = Substitute.For<INapSession>();
            settingService = Substitute.For<ISettingService>();
            dashboardService = Substitute.For<IDashboardService>();
            permissionService = Substitute.For<IPermissionService>();
            return new DashboardController(napSession, settingService, dashboardService, permissionService);
        }

        #endregion Helpers
    }
}
