namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models.LicenseeInfo;
    using CRM.BackgroundJob.Models.ProblemsAccount;
    using CRM.BackgroundJob.Models.ResultAmendment;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.UnitTests.Testable;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using Xunit;

    public class AutoFeedbackServiceTests
    {
        private AppJobSettings appSettings;
        private IJobRunningChecker jobRunningChecker;
        private ISystemSettingService systemSettingService;
        private IWinLossFeedbackService winLossService;
        private ICRMLogService logService;
        private ITOControlFeedbackService tOControlFeedbackService;
        private IProblemsAccountFeedbackService problemsAccountFeedbackService;
        private ISynchronizeLicenseeService licenseeService;
        private IConfiguration configuration;
        private IResultAmendmentService resultAmendmentService;
        private IFeedbackService feedbackService;
        private IVoidingSettledTicketsFeedbackService voidingSettledTicketsService;
        private IArchivingDAService archivingDAService;

        private readonly IFixture fixture = new Fixture();

        #region ExecuteJobAsync
        [Fact]
        public async Task ExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetAbnormalBetSettingAsync(Arg.Any<string>())).Throw(exception);

            // Assert
            await service.AbnormalbetExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
        }

        [Fact]
        public async Task ExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);

            // Act
            await service.AbnormalbetExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Abnormal Bet - Service is shutdown.");
        }

        [Fact]
        public async Task ExecuteJobAsync_LIVEEnvironment_ExpectedCallExactFunction()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                JobStatus = "running",
                JobStatusUAT = "completed"
            };
            var service = GetService();
            var env = Constants.DefaultEnvironment;
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            configuration.GetValue<string>("SiteEnvironment").Returns(env);

            // Act
            await service.AbnormalbetExecuteJobAsync();

            // Assert
            service.Received().Protected("AbnormalbetRunJobByEnviromentAsync",
                false, false, true, setting, Constants.DefaultEnvironment
                );
        }

        [Fact]
        public async Task ExecuteJobAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(false, true, false, setting, "LIVE");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ExecuteJobAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_AutoFB);
        }

        [Fact]
        public async Task AbnormalbetRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task AbnormalbetRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(false, true, true, setting, "LIVE");

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_AutoFB);
        }

        [Fact]
        public async Task AbnormalbetRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(false, false, false, setting, "LIVE");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
            await feedbackService.Received().CreateFeedbackForVoidingAbnormalBetAsync(setting, false, setting.LastRuntime, SystemSettingName.LastRuntime, SystemSettingName.JobStatus, "LIVE");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
        }

        [Fact]
        public async Task AbnormalbetRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetAbnormalBetSettingAsync(Arg.Any<string>()).Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet).Returns(false);

            // Act
            await service.Public_AbnormalbetRunJobByEnviromentAsync(true, false, false, setting, "UAT");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
            await feedbackService.Received().CreateFeedbackForVoidingAbnormalBetAsync(setting, true, setting.LastRuntimeUAT, SystemSettingName.LastRuntimeUAT, SystemSettingName.JobStatusUAT, "UAT");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
        }

        #endregion ExecuteJobAsync

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
        public async Task VoidingSettledTicketsExecuteJobAsync_Exception_ExpectedWriteLogAndClearJob()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            systemSettingService.When(x => x.GetVoidingSettledTicketsSettingAsync()).Throw(exception);

            // Assert
            await service.VoidingSettledTicketsExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingSettledTickets);
        }

        [Fact]
        public async Task VoidingSettledTicketsExecuteJobAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new ResultAmendmentSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);

            // Act
            await service.VoidingSettledTicketsExecuteJobAsync();

            // Assert
            logService.Received().LogInformation("Service Voiding Settled Tickets is shutdown.");
        }

        [Fact]
        public async Task VoidingSettledTicketsExecuteJobAsync_LIVEEnvironment_ExpectedCallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                JobStatus = "running",
                JobStatusUAT = "completed"
            };
            var service = GetService();
            var env = Constants.DefaultEnvironment;
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            configuration.GetValue<string>("SiteEnvironment").Returns(env);

            // Act
            await service.VoidingSettledTicketsExecuteJobAsync();

            // Assert
            service.Received().Protected("VoidingSettledTicketsRunJobByEnviromentAsync",
                false, false, true, setting, Constants.DefaultEnvironment
                );
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingSettledTickets).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(false, true, false, setting, "LIVE");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingSettledTickets).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_AutoVoidFB);
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingSettledTickets).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingSettledTickets).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(false, true, true, setting, "LIVE");

            // Assert
            logService.Received().LogInformation("Update  status and return serive voidding settled tickets.");
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_AutoVoidFB);
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingSettledTickets).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(false, false, false, setting, "LIVE");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForVoidingSettledTickets);
            await voidingSettledTicketsService.Received().CreateFeedbackForVoidingSettledTickets(setting, false, setting.LastRuntime, SystemSettingName.LastRuntime, SystemSettingName.JobStatus, "LIVE");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingSettledTickets);
        }

        [Fact]
        public async Task VoidingSettledTicketsRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetVoidingSettledTicketsSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(false);

            // Act
            await service.Public_VoidingSettledTicketsRunJobByEnviromentAsync(true, false, false, setting, "UAT");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForVoidingSettledTickets);
            await voidingSettledTicketsService.Received().CreateFeedbackForVoidingSettledTickets(setting, true, setting.LastRuntimeUAT, SystemSettingName.LastRuntimeUAT, SystemSettingName.JobStatusUAT, "UAT");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingSettledTickets);
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

        #region SynchronizeNewLicenseeOICExecuteJobAsync
        [Fact]
        public async Task SynchronizeNewLicenseeOICExecuteJobAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            licenseeService.When(x => x.GetOICLicenseeInfo()).Throw(exception);

            // Assert
            await service.SynchronizeNewLicenseeOICExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task SynchronizeNewLicenseeOICExecuteJobAsync_ExceptionImportData_ExpectedWriteLog()
        {
            // Arrange
            var exception = fixture.Create<Exception>();
            var service = GetService();
            var licensee = fixture.Create<IEnumerable<LicenseeStatus>>();
            licenseeService.GetOICLicenseeInfo().Returns(licensee);
            licenseeService.When(x => x.ImportLicenseeStatus(licensee, "LIVE")).Throw(exception);

            // Assert
            await service.SynchronizeNewLicenseeOICExecuteJobAsync();

            // Act
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task SynchronizeNewLicenseeOICExecuteJobAsync_ImportDataIsNotSuccessfull_ExpectedWriteLog()
        {
            // Arrange
            var service = GetService();
            var commandResult = new CommandResult { Code = 1 };
            var licensee = fixture.Create<IEnumerable<LicenseeStatus>>();
            licenseeService.GetOICLicenseeInfo().Returns(licensee);
            licenseeService.ImportLicenseeStatus(licensee, "LIVE").Returns(commandResult);

            // Assert
            await service.SynchronizeNewLicenseeOICExecuteJobAsync();

            // Act
            logService.Received().LogInformation(commandResult.Message);
        }

        [Fact]
        public async Task SynchronizeNewLicenseeOICExecuteJobAsync_ImportDataIsSuccessfull_DoNothing()
        {
            // Arrange
            var service = GetService();
            var commandResult = new CommandResult { Code = 0 };
            var licensee = fixture.Create<IEnumerable<LicenseeStatus>>();
            licenseeService.GetOICLicenseeInfo().Returns(licensee);
            licenseeService.ImportLicenseeStatus(licensee, "LIVE").Returns(commandResult);

            // Assert
            await service.SynchronizeNewLicenseeOICExecuteJobAsync();

            // Act
            logService.DidNotReceive();
        }
        #endregion SynchronizeNewLicenseeOICExecuteJobAsync

        #region VoidingSettledTicketsExecuteJobAsync
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
        public async Task ResultAmendmentExecuteJobAsync_LIVEEnvironment_ExpectedCallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                JobStatus = "running",
                JobStatusUAT = "completed"
            };
            var service = GetService();
            var env = Constants.DefaultEnvironment;
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            configuration.GetValue<string>("SiteEnvironment").Returns(env);

            // Act
            await service.ResultAmendmentExecuteJobAsync();

            // Assert
            service.Received().Protected("ResultAmendmentRunJobByEnviromentAsync",
                false, false, true, setting, Constants.DefaultEnvironment
                );
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(false, true, false, setting, "LIVE");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_ResultAmendment);
        }

        [Fact]
        public async Task ResultAmendmentRunJobByEnviromentAsync_EnvironmentIsUATAndJobIsRunningAndLastRuntimeIsLowerThanNow_DoNothing()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(true, true, false, setting, "UAT");

            // Assert
            await systemSettingService.DidNotReceive().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>());
        }

        [Fact]
        public async Task ResultAmendmentRunJobByEnviromentAsync_EnvironmentIsLIVEAndJobIsRunningAndLastRuntimeIsGreaterThanNow_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now.AddMinutes(-6),
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(false, true, true, setting, "LIVE");

            // Assert
            logService.Received().LogInformation("Update  status and return serive result amendment.");
            await systemSettingService.Received().EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_ResultAmendment);
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_EnvironmentIsLIVEAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntime = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(false, false, false, setting, "LIVE");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForResultAmendment);
            await resultAmendmentService.Received().CreateFeedbackForResultAmendmentAsync(setting, false, setting.LastRuntime, SystemSettingName.LastRuntime, SystemSettingName.JobStatus, "LIVE");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForResultAmendment);
        }

        [Fact]
        public async Task ResultAmendmentExecuteJobAsync_EnvironmentIsUATAndJobIsNotRunning_CallExactFunction()
        {
            // Arrange
            var setting = new ResultAmendmentSetting
            {
                ServiceFlag = true,
                LastRuntimeUAT = DateTime.Now,
                JobStatus = JobStatus.Running,
                JobStatusUAT = JobStatus.Running
            };
            var service = GetService();
            systemSettingService.GetResultAmendmentSettingAsync().Returns(setting);
            jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment).Returns(false);

            // Act
            await service.Public_ResultAmendmentRunJobByEnviromentAsync(true, false, false, setting, "UAT");

            // Assert
            await jobRunningChecker.Received().MarkRunning(JobName.CreateFeedbackForResultAmendment);
            await resultAmendmentService.Received().CreateFeedbackForResultAmendmentAsync(setting, true, setting.LastRuntimeUAT, SystemSettingName.LastRuntimeUAT, SystemSettingName.JobStatusUAT, "UAT");
            await jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForResultAmendment);
        }

        #endregion VoidingSettledTicketsExecuteJobAsync

        #region Helpers

        private AutoFeedbackServiceTestable GetService()
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
            feedbackService = Substitute.For<IFeedbackService>();
            licenseeService = Substitute.For<ISynchronizeLicenseeService>(); 
            configuration = Substitute.For<IConfiguration>();
            voidingSettledTicketsService = Substitute.For<IVoidingSettledTicketsFeedbackService>();
            archivingDAService = Substitute.For<IArchivingDAService>();
            return Substitute.For<AutoFeedbackServiceTestable>(
                appJobSettings,
                jobRunningChecker,
                systemSettingService,
                winLossService,
                logService,
                tOControlFeedbackService,
                resultAmendmentService,
                problemsAccountFeedbackService,
                feedbackService,
                licenseeService,
                voidingSettledTicketsService,
                archivingDAService,
                configuration);
        }

        #endregion Helpers
    }
}