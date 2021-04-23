namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models.ProblemsAccount;
    using CRM.BackgroundJob.Models.ResultAmendment;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.UnitTests.Testable;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Configuration;
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
        private IProblemsAccountFeedbackService problemsAccountFeedbackService;
        private IConfiguration configuration;
        private IResultAmendmentService resultAmendmentService;

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

        #region ResultAmendmentExecuteJobAsync
        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetResultAmendmentSettingAsync()).Throw(exception);

            // Assert
            await service.ResultAmendmentExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForResultAmendment);
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new ResultAmendmentSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);

            // Act
            await service.ResultAmendmentExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Service Result Amendment is shutdown.");
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_JobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(true);

            // Act
            await service.ResultAmendmentExecuteJobAsync();

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_JobIsRunningAndLastRuntimeIsGreaterThanNow_DoNothing()
        {
            // Arrange
            var service = GetService();
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-appSettings.RetryRuntime - 1),
                JobStatus = JobStatus.Running
            };
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(false);

            // Act
            await service.ResultAmendmentExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Rerun Result Amendment service.");
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_ResultAmendment);
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_JobIsCompleted_ExpectedCallCreateFeedback()
        {
            // Arrange
            var service = GetService();
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                JobStatus = JobStatus.Completed
            };
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);

            // Act
            await service.ResultAmendmentExecuteJobAsync();

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForResultAmendment);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForResultAmendment);
            await resultAmendmentService.Received().CreateFeedbackForResultAmendmentAsync(setting);
        }

        #endregion ResultAmendmentExecuteJobAsync

        #region ProblemsAcccountExecuteJobAsync
        [Fact]
        public async Task ProblemsAcccountExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetProblemsAccountSettingAsync()).Throw(exception);

            // Assert
            await service.ProblemsAcccountExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForProblemsAccount);
        }

        [Fact]
        public async Task ProblemsAcccountExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new ProblemsAccountSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetProblemsAccountSettingAsync().Returns(setting);

            // Act
            await service.ProblemsAcccountExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Service Problems Account is shutdown.");
        }

        [Fact]
        public async Task ProblemsAcccountExecuteJobAsync_LIVEEnvironment_ExpectedCallExactFunction()
        {
            // Arrange
            var setting = new ProblemsAccountSetting { 
                ServiceFlag = true,
                JobStatus = "running",
                JobStatusUAT = "completed"
            };
            var service = GetService();
            var env = Constants.DefaultEnvironment;
            systemSettingService.GetProblemsAccountSettingAsync().Returns(setting);
            configuration.GetValue<string>("SiteEnvironment").Returns(env);

            // Act
            await service.ProblemsAcccountExecuteJobAsync();

            // Assert
            service.Received().Protected("ProblemsAcccountRunJobByEnviromentAsync",
                false, false, true, setting, Constants.DefaultEnvironment
                );
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(false, true, false , setting, "LIVE");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_ProblemsAccount);
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(false, true, true, setting, "LIVE");

            // Assert
            logService.Received().LogInformation("Update  status and return serive problems account.");
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_ProblemsAccount);
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(false, false, false, setting, "LIVE");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForProblemsAccount);
            await problemsAccountFeedbackService.Received().CreateFeedbackForProblemsAccountAsync(setting, false, setting.LastRuntime, SystemSettingName.LastRuntime, SystemSettingName.JobStatus,"LIVE");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForProblemsAccount);
        }

        [Fact]
        public async Task ProblemsAcccountRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ProblemsAccountSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetTurnoverSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ProblemsAcccountRunJobByEnviromentAsync(true, false, false, setting, "UAT");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForProblemsAccount);
            await problemsAccountFeedbackService.Received().CreateFeedbackForProblemsAccountAsync(setting, true, setting.LastRuntimeUAT, SystemSettingName.LastRuntimeUAT, SystemSettingName.JobStatusUAT, "UAT");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForProblemsAccount);
        }

        #endregion ProblemsAcccountExecuteJobAsync

        #region Helpers

        private AutoWinLossFeedbackServiceTestable GetService()
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
            problemsAccountFeedbackService = Substitute.For<IProblemsAccountFeedbackService>();
            resultAmendmentService = Substitute.For<IResultAmendmentService>();
            configuration = Substitute.For<IConfiguration>();
            return Substitute.For<AutoWinLossFeedbackServiceTestable>(
                appJobSettings,
                jobRunningChecker,
                systemSettingService,
                winLossService,
                logService,
                tOControlFeedbackService,
                problemsAccountFeedbackService,
                resultAmendmentService);
                configuration);
        }

        #endregion Helpers
    }
}