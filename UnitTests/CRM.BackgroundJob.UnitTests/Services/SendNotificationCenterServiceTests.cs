namespace CRM.BackgroundJob.UnitTests.Services
{
    using AutoFixture;
    using CRM.BackgroundJob.Criteria.CaptureSettlementData;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using NSubstitute;
    using Xunit;
    using CRM.BackgroundJob.Criteria.SendNotificationCenter;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;

    public class SendNotificationCenterServiceTests
    {
        private IBaseService baseService;

        [Fact]
        public async Task InsertNotificationAlertAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Any<InsertNotificationAlertCommand>()).Returns(expected);

            // Act
            var actual = await service.InsertNotificationAlertAsync("dev");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetNotificationAlertAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<MessageBotInfo>>();
            var service = GetService();
            baseService.GetDataAsync<MessageBotInfo>(Arg.Any<GetNotificationAlerCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetNotificationAlertAsync("dev");

            // Assert
            Assert.Equal(expected, actual);
        }

        #region Helpers
        private SendNotificationCenterService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            return new SendNotificationCenterService(baseService);
        }
        #endregion Helpers
    }
}
