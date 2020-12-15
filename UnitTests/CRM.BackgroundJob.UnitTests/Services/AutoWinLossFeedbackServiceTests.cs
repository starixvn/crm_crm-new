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
        private ITOControlFeedbackService tOControlFeedbackService;
        private readonly IFixture fixture = new Fixture();

        #region WinLossExecuteJobAsync
        [Fact]
        public async Task WinLossExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
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
            logService.Received().LogInformation("Service Company Winloss is shutdown.");
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
                LastRuntime = DateTime.Now.AddMinutes(-appSettings.RetryRuntime - 1),
                JobStatus = JobStatus.Running
            };
            systemSettingService.GetWinLossSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForWinLossLimit).Returns(false);

            // Act
            await service.WinLossExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Rerun Company Winloss service.");
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

        #endregion WinLossExecuteJobAsync

        #region TurnoverControlExecuteJobAsync
        [Fact]
        public async Task TurnoverControlExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetTurnoverSettingAsync()).Throw(exception);

            // Assert
            await service.TurnoverControlExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForTurnoverControl);
        }

        [Fact]
        public async Task TurnoverControlExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new WinLossSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);

            // Act
            await service.TurnoverControlExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Service Turnover Controll is shutdown.");
        }

        [Fact]
        public async Task TurnoverControlExecuteJobAsync_JobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForTurnoverControl).Returns(true);

            // Act
            await service.TurnoverControlExecuteJobAsync();

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task TurnoverControlExecuteJobAsync_JobIsRunningAndLastRuntimeIsGreaterThanNow_DoNothing()
        {
            // Arrange
            var service = GetService();
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-appSettings.RetryRuntime - 1),
                JobStatus = JobStatus.Running
            };
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForTurnoverControl).Returns(false);

            // Act
            await service.TurnoverControlExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Rerun Turnover Controll service.");
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_TOControlFB);
        }

        [Fact]
        public async Task TurnoverControlExecuteJobAsync_JobIsCompleted_ExpectedCallCreateFeedback()
        {
            // Arrange
            var service = GetService();
            var setting = new WinLossSystemSetting
            {
                ServiceFlag = true,
                JobStatus = JobStatus.Completed
            };
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);

            // Act
            await service.TurnoverControlExecuteJobAsync();

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForTurnoverControl);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForTurnoverControl);
            await tOControlFeedbackService.Received().CreateFeedbackForTurnoverControlAsync(setting);
        }

        #endregion TurnoverControlExecuteJobAsync

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
            tOControlFeedbackService = Substitute.For<ITOControlFeedbackService>();
            return new AutoWinLossFeedbackService(
                appJobSettings,
                jobRunningChecker,
                systemSettingService,
                winLossService,
                logService,
                tOControlFeedbackService);
        }

        #endregion Helpers
    }
}