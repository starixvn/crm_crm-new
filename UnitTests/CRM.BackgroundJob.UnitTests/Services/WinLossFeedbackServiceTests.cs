namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
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
        private IFixture fixture = new Fixture();

        #region CreateFeedbackForWinLossLimitAsync

        [Fact]
        public async Task CreateFeedbackForWinLossLimitAsync_NotExistedWinlossInfo_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var setting = fixture.Create<WinLossSystemSetting>();
            var cusWinLimit = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var headlines = fixture.Create<IEnumerable<GroupHeadline>>();
            var winLimit = fixture.Create<IEnumerable<WinLimitFeedBackInfo>>();
            var betInfo = fixture.Create<IEnumerable<BettypeInfo>>();
            var winlossInfo = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betInfo);
            var service = MockService();
            customerService.getListCustReachLimitAsync(setting.LastLogID,setting.BatchSize).Returns(cusWinLimit);
            transactionService.ImportWinLimitFeedbackInfoAsync(cusWinLimit, headlines).Returns(winlossInfo);
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

        #endregion CreateFeedbackForWinLossLimitAsync

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
