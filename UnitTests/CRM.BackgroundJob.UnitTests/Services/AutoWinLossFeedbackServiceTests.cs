namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using Xunit;

    public class AutoWinLossFeedbackServiceTests
    {
        private AppJobSettings appSettings;
        private IJobRunningChecker jobRunningChecker;
        private ISystemSettingService systemSettingService;
        private IWinLossFeedbackService winLossService;
        private ICRMLogService logService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task WinLoss_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetWinLossSettingAsync()).Throw(exception);

            // Assert
            await service.WinLossExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForWinLossLimit);
        }

        [Fact]
        public async Task WinLossExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new WinLossSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetWinLossSettingAsync().Returns(setting);

            // Act
            await service.WinLossExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Service is shutdown.");
        }

        [Fact]
        public async Task WinLossExecuteJobAsync_JobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetWinLossSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForWinLossLimit).Returns(true);

            // Act
            await service.WinLossExecuteJobAsync();

            // Assert
            logService.DidNotReceive().LogInformation(Arg.Any<string>());
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task WinLossExecuteJobAsync_JobIsRunningAndLastRuntimeIsGreaterThanNow_DoNothing()
        {
            // Arrange
            var service = GetService();
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-appSettings.RetryRuntime),
                JobStatus = JobStatus.Running
            };
            systemSettingService.GetWinLossSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForWinLossLimit).Returns(false);

            // Act
            await service.WinLossExecuteJobAsync();

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_WinLimitFB);
        }

        [Fact]
        public async Task WinLossExecuteJobAsync_JobIsCompleted_ExpectedCallCreateFeedback()
        {
            // Arrange
            var service = GetService();
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                JobStatus = JobStatus.Completed
            };
            systemSettingService.GetWinLossSettingAsync().Returns(setting);

            // Act
            await service.WinLossExecuteJobAsync();

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForWinLossLimit);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForWinLossLimit);
            await winLossService.Received().CreateFeedbackForWinLossLimitAsync(setting);
        }

        #region Helpers

        private AutoWinLossFeedbackService GetService()
        {
            appSettings = new AppJobSettings
            {
                RetryRuntime = 5
            };
            var appJobSettings = Substitute.For<IOptionsSnapshot<AppJobSettings>>();
            appJobSettings.Value.Returns(appSettings);
            jobRunningChecker = Substitute.For<IJobRunningChecker>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            winLossService = Substitute.For<IWinLossFeedbackService>();
            logService = Substitute.For<ICRMLogService>();
            return new AutoWinLossFeedbackService(
                appJobSettings,
                jobRunningChecker,
                systemSettingService,
                winLossService,
                logService);
        }

        #endregion Helpers
    }
}