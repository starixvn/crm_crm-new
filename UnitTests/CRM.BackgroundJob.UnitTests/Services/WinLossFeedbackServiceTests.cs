namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.UnitTests.Testable;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using Xunit;

    public class WinLossFeedbackServiceTests
    {
        private AppJobSettings appSettings;
        private IBaseService baseService;
        private ISettingService settingService;
        private ISystemSettingService systemSettingService;
        private ICustomerService customerService;
        private ICRMLogService logService;
        private IWinLossTransactionService transactionService;
        private readonly IFixture fixture = new Fixture();

        #region CreateFeedbackForWinLossLimitAsync

        [Fact]
        public async Task CreateFeedbackForWinLossLimitAsync_NotExistedWinlossInfo_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var service = MockService();
            var setting = fixture.Create<WinLossSystemSetting>();
            var cusWinLimit = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var winLimit = new List<WinLimitFeedBackInfo>();
            var betInfo = fixture.Create<IEnumerable<BettypeInfo>>();
            var winlossInfo = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betInfo);
            customerService.getListCustReachLimitAsync(setting.LastLogID, setting.BatchSize).Returns(cusWinLimit);
            transactionService.ImportWinLimitFeedbackInfoAsync(Arg.Any<IEnumerable<CustomerWinLimit>>(), Arg.Any<IEnumerable<GroupHeadline>>()).Returns(winlossInfo);
            // Act
            await service.CreateFeedbackForWinLossLimitAsync(setting);

            // Assert
            service.Received().Protected("EditSystemSettingAsync", Arg.Any<int>());
            service.DidNotReceive().Protected(
                "CreateWinLossFeedbackCreditAsync",
                Arg.Any<WinLimitFeedBackInfo>(),
                Arg.Any<IEnumerable<BettypeInfo>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForWinLossLimitAsync_ExistedWinlossInfo_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var service = MockService();
            var setting = fixture.Create<WinLossSystemSetting>();
            var cusWinLimit = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var winLimit = new List<WinLimitFeedBackInfo>
            {
                new WinLimitFeedBackInfo { LogID = 1, CustId = 1}
            };
            var betInfo = new List<BettypeInfo>
            {
                new BettypeInfo {Name = "Gaming", Bettype = "1"}
            };
            var winlossInfo = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betInfo);
            customerService.getListCustReachLimitAsync(setting.LastLogID, setting.BatchSize).Returns(cusWinLimit);
            transactionService.ImportWinLimitFeedbackInfoAsync(Arg.Any<IEnumerable<CustomerWinLimit>>(), Arg.Any<IEnumerable<GroupHeadline>>()).Returns(winlossInfo);
            // Act
            await service.CreateFeedbackForWinLossLimitAsync(setting);

            // Assert
            service.Received().Protected("EditSystemSettingAsync", Arg.Any<int>());
            service.Received().Protected(
                "CreateWinLossFeedbackCreditAsync",
                Arg.Any<WinLimitFeedBackInfo>(),
                Arg.Any<IEnumerable<BettypeInfo>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        #endregion CreateFeedbackForWinLossLimitAsync

        #region CreateWinLossFeedbackCreditAsync

        [Fact]
        public async Task CreateWinLossFeedbackCreditAsync__CreateSuccessful_ExpectedWriteLog()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var betInfo = new List<BettypeInfo>
            {
                new BettypeInfo {Name = "Gaming", Bettype = "1"},
                new BettypeInfo {Name = "Bet", Bettype = "2" }
            };
            var settings = new List<SettingItem>
            {
                new SettingItem { SettingId = 1, SettingName = "Status", SettingValue = "Closed" },
                new SettingItem { SettingId = 2, SettingName = "Response", SettingValue = "Neutral" },
                new SettingItem { SettingId = 2022, SettingName = "Station" }
            };
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var category = fixture.Create<Tuple<int, int, string>>();
            var commandResult = new CommandResult { Code = 0 };
            var service = MockService();
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);
            service.Protected("GetCategorySubCategory", settings).Returns(category);
            service.Protected("GetProductXml", winLimit, Arg.Any<List<BettypeInfo>>(), settings, settingMappings).Returns("product xml");
            service.Protected("GetSolution", winLimit).Returns("solution");
            service.Protected("GetRelatedCustomerXml", winLimit).Returns("related customer xml");
            service.Protected("GetDescription", winLimit, Arg.Any<List<BettypeInfo>>()).Returns("description");

            // Act
            await service.Public_CreateWinLossFeedbackCreditAsync(
                winLimit,
                betInfo,
                settings,
                settingMappings
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task CreateWinLossFeedbackCreditAsync__Exception_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var betInfo = new List<BettypeInfo>
            {
                new BettypeInfo {Name = "Gaming", Bettype = "1"},
                new BettypeInfo {Name = "Bet", Bettype = "2" }
            };
            var settings = new List<SettingItem>
            {
                new SettingItem { SettingId = 1, SettingName = "Status", SettingValue = "Closed" },
                new SettingItem { SettingId = 2, SettingName = "Response", SettingValue = "Neutral" },
                new SettingItem { SettingId = 2022, SettingName = "Station" }
            };
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var category = fixture.Create<Tuple<int, int, string>>();
            var service = MockService();
            baseService.When(x => x.ExecuteNonQueryAsync(criteria)).Throw(exception);
            service.Protected("GetCategorySubCategory", settings).Returns(category);
            service.Protected("GetProductXml", winLimit, Arg.Any<List<BettypeInfo>>(), settings, settingMappings).Returns("product xml");
            service.Protected("GetSolution", winLimit).Returns("solution");
            service.Protected("GetRelatedCustomerXml", winLimit).Returns("related customer xml");
            service.Protected("GetDescription", winLimit, Arg.Any<List<BettypeInfo>>()).Returns("description");

            // Act
            await service.Public_CreateWinLossFeedbackCreditAsync(
                winLimit,
                betInfo,
                settings,
                settingMappings
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, exception.Message);
            await logService.ErrorAsync(exception);
        }

        #endregion CreateWinLossFeedbackCreditAsync

        #region Helpers

        private WinLossFeedbackServiceTesable MockService()
        {
            appSettings = new AppJobSettings
            {
                CreatorId = 8,
                TimeSpan = 12
            };
            var appJobSettings = Substitute.For<IOptionsSnapshot<AppJobSettings>>();
            appJobSettings.Value.Returns(appSettings);
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            customerService = Substitute.For<ICustomerService>();
            logService = Substitute.For<ICRMLogService>();
            transactionService = Substitute.For<IWinLossTransactionService>();

            return Substitute.For<WinLossFeedbackServiceTesable>(
                appJobSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService
                );
        }

        #endregion Helpers
    }
}