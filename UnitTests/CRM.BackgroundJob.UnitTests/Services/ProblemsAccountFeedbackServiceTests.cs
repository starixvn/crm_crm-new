using AutoFixture;
using CRM.BackgroundJob.Services;
using CRM.BackgroundJob.UnitTests.Testable;
using CRM.Core.Services;
using Fanex.CRM.BackgroundJob.Models;
using Fanex.CRM.BackgroundJob.Services;
using Microsoft.Extensions.Options;
using NSubstitute;

namespace CRM.BackgroundJob.UnitTests.Services
{
    public class ProblemsAccountFeedbackServiceTests
    {
        private AppJobSettings appSettings;
        private IBaseService baseService;
        private ISettingService settingService;
        private ISystemSettingService systemSettingService;
        private ICustomerService customerService;
        private ICRMLogService logService;
        private IWinLossTransactionService transactionService;
        private ICommonFeedback commonFeedback;
        private readonly IFixture fixture = new Fixture();

        #region CreateFeedbackForProblemsAccountAsync

        #endregion

        #region Helpers

        private ProblemsAccountFeedbackServiceTestable MockService()
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
            commonFeedback = Substitute.For<ICommonFeedback>();

            return Substitute.For<ProblemsAccountFeedbackServiceTestable>(
                appJobSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService,
                commonFeedback
                );
        }

        #endregion Helpers
    }
}
