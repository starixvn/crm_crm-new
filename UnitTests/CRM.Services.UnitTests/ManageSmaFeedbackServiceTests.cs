using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Models;
using CRM.Models.ManageSmaFeedback;
using CRM.Services.HeadlineNotification;
using CRM.Services.Interfaces;
using NSubstitute;
using Xunit;

namespace CRM.Services.UnitTests
{
    public class ManageSmaFeedbackServiceTests
    {
        private ICommonService commonService;
        private IBaseService baseService;
        private readonly Fixture fixture = new();

        [Fact]
        public async Task GetSmaFeedbackAsync_ShouldReturnSmaFeedbackInfos()
        {
            // Arrange
            var service = GetService();
            var param = fixture.Create<GetSmaFeedbackInfo>();
            var feedbackInfos = new List<SmaFeedbackInfo>
            {
                new() { CustID = 1, CreatedDate = DateTime.Now, Username = "testuser" }
            };
            baseService.GetDataAsync<SmaFeedbackInfo>(Arg.Any<GetSmaFeedbackCriteria>()).Returns(feedbackInfos);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(DateTime.Now);

            // Act
            var result = await service.GetSmaFeedbackAsync(param);

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
        }

        [Fact]
        public async Task EditSmaFeedbackAsync_ShouldReturnCommandResult()
        {
            // Arrange
            var service = GetService();
            var param = fixture.Create<EditSmaFeedback>();
            var commandResult = new CommandResult { Code = 0, Message = "Success" };
            baseService.ExecuteNonQueryAsync(Arg.Any<EditSmaFeedbackCommand>()).Returns(commandResult);

            // Act
            var result = await service.EditSmaFeedbackAsync(param);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(0, result.Code);
            Assert.Equal("Success", result.Message);
        }

        #region Helpers
        private ManageSmaFeedbackService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();

            return new ManageSmaFeedbackService(baseService, commonService);
        }
        #endregion Helpers
    }
}