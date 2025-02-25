namespace CRM.Controllers.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.AdminTool;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.JobSettingManagement;
    using CRM.Models.AdminTool;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class JobSettingManagementControllerTests
    {
        private INapSession napSession;
        private IBaseService baseService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task GetServiceNameSettings_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetServiceNameSettingCriteria>();
            var serviceNames = fixture.Create<IEnumerable<string>>();
            baseService.GetDataAsync<string>(Arg.Do<GetServiceNameSettingCriteria>(x => criteria = x)).Returns(serviceNames);

            // Act
            var result = await controller.GetServiceNameSettings();
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = jsonResult.Value;
            // Assert
            Assert.Equal(serviceNames, actual);
        }

        [Fact]
        public async Task GetSettingNames_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetConfigSettingCriteria>();
            var configs = fixture.Create<IEnumerable<JobSetting>>();
            var expected = configs.GroupBy(x => x.SettingName).Select(y => y.Key);
            baseService.GetDataAsync<JobSetting>(Arg.Do<GetConfigSettingCriteria>(x => criteria = x)).Returns(configs);

            // Act
            var result = await controller.GetSettingNames(criteria);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = jsonResult.Value;
            // Assert
            Assert.Equal(actual, expected);
        }

        [Fact]
        public async Task GetConfigSettings_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetConfigSettingCriteria>();
            var configs = fixture.Create<IEnumerable<JobSetting>>();
            baseService.GetDataAsync<JobSetting>(Arg.Do<GetConfigSettingCriteria>(x => criteria = x)).Returns(configs);

            // Act
            var result = await controller.GetConfigSettings(criteria);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = jsonResult.Value;
            // Assert
            Assert.Equal(actual, configs);
        }

        [Fact]
        public async Task EditJobSetting_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var controller = GetController();
            var command = fixture.Create<EditJobSettingCommand>();
            var commandResult = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(Arg.Do<EditJobSettingCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.EditJobSetting(command);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = jsonResult.Value;
            // Assert
            Assert.Equal(actual, commandResult);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
        }

        #region Helpers

        private JobSettingManagementController GetController()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            return new JobSettingManagementController(napSession, baseService);
        }

        #endregion Helpers
    }
}