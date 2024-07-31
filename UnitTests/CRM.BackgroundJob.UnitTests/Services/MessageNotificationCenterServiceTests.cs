namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.UnitTests.Testable;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.BotService.Client.Core.Services.Interfaces;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Configuration;
    using NSubstitute;
    using Xunit;

    public class MessageNotificationCenterServiceTests
    {
        private ICRMLogService logService;
        private IConfiguration configuration;
        private ICommonFeedback commonFeedback;
        private ICaptureSettlementDataService captureSettlementDataService;
        private IGenerateResultAmendmentService generateResultAmendmentService;
        private IPushNotificationResultAmendmentService pushNotificationResultAmendmentService;
        private IGenerateLapNotificationService generateLapNotificationService;
        private ISendNotificationCenterService sendNotificationCenterService;
        private ISystemSettingService systemSettingService;
        private IBotService botService;
        private BotServiceSetting botSetting;

        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task CaptureSettlementDataAsync_ExpectedCallExactFunction()
        {
            // Arrange
            var service = GetService();

            var serviceFlag = true;
            var initSiteDbConfigs = new List<SiteDbConfig>
            {
                new() {SiteDBGroupID = 1, LinkedServerName = "LinkedServerName", ClientAccessName = "ClientAccessName", AGIP = "1", Environment = "dev", FDTime = new DateTime()}
            };
            var sessionResultHistorys = new List<SettlResultHistory>
            {
                new () { Environment = "dev", JSSettlResultHist = "JSSettlResultHist"}
            };
            systemSettingService.GetSystemSettingNotificationAsync(Arg.Any<string>()).Returns(serviceFlag);
            captureSettlementDataService.GetInitialSiteDbConfigsAsync(Arg.Any<string>()).Returns(initSiteDbConfigs);
            captureSettlementDataService.GetSessionByDateAsync(initSiteDbConfigs[0]).Returns(sessionResultHistorys);

            // Act
            await service.CaptureSettlementDataAsync();

            // Assert
            await captureSettlementDataService.Received(1).InsertDataLoadAsync("dev", "JSSettlResultHist");
        }

        [Fact]
        public async Task CaptureSettlementDataAsync_ExpectedReturnLogService()
        {
            // Arrange
            var service = GetService();

            var serviceFlag = false;
            systemSettingService.GetSystemSettingNotificationAsync(Arg.Any<string>()).Returns(serviceFlag);

            // Act
            await service.CaptureSettlementDataAsync();

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task CaptureSettlementDataAsync_ThrowException()
        {
            // Arrange
            var service = GetService();
            var exception = fixture.Create<Exception>();

            systemSettingService.When(x => x.GetSystemSettingNotificationAsync(Arg.Any<string>())).Throw(exception);

            // Act
            await service.CaptureSettlementDataAsync();

            // Assert
            await logService.Received(1).ErrorAsync(Arg.Any<Exception>());
        }

        [Theory]
        [InlineData("LeagueID", "1", "EN", "LeagueName")]
        [InlineData("SportType", "1", "EN", "SportName")]
        [InlineData("TeamID", "1", "EN", "TeamName")]
        [InlineData("ResourceCricket", "1", "EN", "ResourceCricketName")]
        [InlineData("ResultSettlement", "1", "EN", "ResultSettlementName")]
        [InlineData("test", "1", "EN", "")]
        public void GetResourceRemotingRef_ReturnExpected(string type, string id, string languageCode, string expected)
        {
            // Arrange
            var service = GetService();

            commonFeedback.GetLeagueName(id, languageCode).Returns("LeagueName");
            commonFeedback.GetSportName(id, languageCode).Returns("SportName");
            commonFeedback.GetTeamName(id, languageCode).Returns("TeamName");
            commonFeedback.GetResourceCricketName(id, languageCode).Returns("ResourceCricketName");
            commonFeedback.GetResultSettlementName(id, languageCode).Returns("ResultSettlementName");

            // Act
            var actual = service.Public_GetResourceRemotingRef(type, id, languageCode);

            // Assert
            Assert.Equal(expected, actual);
        }

        //[Fact]
        //public async Task GenerateResultAmendmentAsync_ExpectedCallExactFunction()
        //{
        //    // Arrange
        //    var service = GetService();

        //    var serviceFlag = true;
        //    var initSiteDbConfigs = new List<SettlementRemotingRefInfo>
        //    {
        //        new() {SiteDBGroupID = 1, LinkedServerName = "LinkedServerName", ClientAccessName = "ClientAccessName", AGIP = "1", Environment = "dev", FDTime = new DateTime()}
        //    };
        //    var sessionResultHistorys = new List<SettlResultHistory>
        //    {
        //        new () { Environment = "dev", JSSettlResultHist = "JSSettlResultHist"}
        //    };
        //    systemSettingService.GetSystemSettingNotificationAsync(Arg.Any<string>()).Returns(serviceFlag);
        //    generateResultAmendmentService.GetPrepareGenNotificationAsync(Arg.Any<string>()).Returns(initSiteDbConfigs);
        //    captureSettlementDataService.GetSessionByDateAsync(initSiteDbConfigs[0]).Returns(sessionResultHistorys);

        //    // Act
        //    await service.CaptureSettlementDataAsync();

        //    // Assert
        //    await captureSettlementDataService.Received(1).InsertDataLoadAsync("dev", "JSSettlResultHist");
        //}

        //[Fact]
        //public async Task GenerateResultAmendmentAsync_ExpectedReturnLogService()
        //{
        //    // Arrange
        //    var service = GetService();

        //    var serviceFlag = false;
        //    systemSettingService.GetSystemSettingNotificationAsync(Arg.Any<string>()).Returns(serviceFlag);

        //    // Act
        //    await service.CaptureSettlementDataAsync();

        //    // Assert
        //    logService.Received(1).LogInformation(Arg.Any<string>());
        //}

        //[Fact]
        //public async Task GenerateResultAmendmentAsync_ThrowException()
        //{
        //    // Arrange
        //    var service = GetService();
        //    var exception = fixture.Create<Exception>();

        //    systemSettingService.When(x => x.GetSystemSettingNotificationAsync(Arg.Any<string>())).Throw(exception);

        //    // Act
        //    await service.CaptureSettlementDataAsync();

        //    // Assert
        //    await logService.Received(1).ErrorAsync(Arg.Any<Exception>());
        //}

        #region Helpers

        private MessageNotificationCenterServiceTestable GetService()
        {
            botSetting = new BotServiceSetting
            {
                AppId = 1,
                ServiceUrl = "/test"
            };
            logService = Substitute.For<ICRMLogService>();
            configuration = Substitute.For<IConfiguration>();
            commonFeedback = Substitute.For<ICommonFeedback>();
            captureSettlementDataService = Substitute.For<ICaptureSettlementDataService>();
            generateResultAmendmentService = Substitute.For<IGenerateResultAmendmentService>();
            pushNotificationResultAmendmentService = Substitute.For<IPushNotificationResultAmendmentService>();
            generateLapNotificationService = Substitute.For<IGenerateLapNotificationService>();
            sendNotificationCenterService = Substitute.For<ISendNotificationCenterService>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            botService = Substitute.For<IBotService>();
            return Substitute.For<MessageNotificationCenterServiceTestable>(
                logService,
                configuration,
                commonFeedback,
                captureSettlementDataService,
                generateResultAmendmentService,
                pushNotificationResultAmendmentService,
                generateLapNotificationService,
                sendNotificationCenterService,
                systemSettingService,
                botService,
                botSetting);
        }

        #endregion Helpers
    }
}
