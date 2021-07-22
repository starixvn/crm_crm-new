namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class MultipleLogsControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private IBaseService baseService;
        private ISettingService settingService;

        [Fact]
        public void Create_Get_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();

            // Act
            var actual = controller.Create();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(actual);
            Assert.Null(viewResult.ViewName);
        }

        [Fact]
        public async Task Create_Post_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new CreateMultipleLogsCommand();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            baseService.ExecuteNonQueryAsync(Arg.Do<CreateMultipleLogsCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.Create(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal(napSession.UserId, command.CreatorId);
            Assert.Equal("1.0.0.0", command.IP);
        }

        [Fact]
        public async Task VerifyCustomer_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<VerifyCustomerCriteria>();
            var customers = fixture.Create<IEnumerable<VerifyCustomerResult>>();
            var controller = GetController();
            baseService.GetDataAsync<VerifyCustomerResult>(criteria).Returns(customers);

            // Act
            var result = await controller.VerifyCustomer(criteria);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<VerifyCustomerResult>>(jsonResult.Value);
            Assert.Equal(customers, actual);
        }

        [Fact]
        public async Task VerifyRelatedCustomer_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<VerifyRelatedCustomerCriteria>();
            var customers = fixture.Create<IEnumerable<VerifyRelatedCustomerResult>>();
            var controller = GetController();
            baseService.GetDataAsync<VerifyRelatedCustomerResult>(criteria).Returns(customers);

            // Act
            var result = await controller.VerifyRelatedCustomer(criteria);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<VerifyRelatedCustomerResult>>(jsonResult.Value);
            Assert.Equal(customers, actual);
        }

        #region Helpers

        private MultipleLogsController GetController()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            return new MultipleLogsController(napSession, baseService, settingService);
        }

        #endregion Helpers
    }
}