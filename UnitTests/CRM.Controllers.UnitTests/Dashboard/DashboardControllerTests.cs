namespace CRM.Controllers.UnitTests.Dashboard
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Dashboard;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Dashboard;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Dashboard;
    using CRM.Models.Redemption;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Dashboard;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class DashboardControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private IDashboardService dashboardService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var permission = (CustomerPermissionViewModel)viewResult.Model;
            Assert.Equal(2, permission.CreateUpdateFeedbackPermission);
        }

        [Fact]
        public async Task GetCustomerRemarks_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<GetCustomerRemarksCriteria>();
            var customerRemarks = fixture.Create<IEnumerable<string>>();
            var controller = GetController();
            dashboardService.GetCustomerRemarksAsync(criteria).Returns(customerRemarks);

            // Act
            var result = await controller.GetCustomerRemarks(criteria);

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
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            dashboardService = Substitute.For<IDashboardService>();
            return new DashboardController(napSession, napSettings, settingService, userService, dashboardService);
        }

        #endregion Helpers
    }
}
