namespace Fanex.CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Models.ProblemsAccount;
    using global::CRM.BackgroundJob.Models.ResultAmendment;
    using global::CRM.BackgroundJob.Models.WinLossLimit;
    using global::CRM.BackgroundJob.Services;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    public interface IAutoFeedbackService
    {
        Task ExecuteJobAsync();
        Task WinLossExecuteJobAsync();
        Task TurnoverControlExecuteJobAsync();
        Task ProblemsAcccountExecuteJobAsync();
        Task ResultAmendmentExecuteJobAsync();
        Task SynchronizeNewLicenseeOICExecuteJobAsync();
    }

    public class AutoFeedbackService : IAutoFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IJobRunningChecker jobRunningChecker;
        private readonly ISystemSettingService systemSettingService;
        private readonly IWinLossFeedbackService winLossService;
        private readonly ITOControlFeedbackService turnoverService;
        private readonly IResultAmendmentService resultAmendmentService;
        private readonly ICRMLogService logService;
        private readonly IProblemsAccountFeedbackService problemsAccountFeedbackService;
        private readonly IFeedbackService feedbackService;
        private readonly ISynchronizeLicenseeService licenseeService;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;
        private const string dateTimeParse = "yyyy-MM-dd hh:mm:ss.fff tt";

#pragma warning disable S107 // Methods should not have too many parameters
        public AutoFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IJobRunningChecker jobRunningChecker,
            ISystemSettingService systemSettingService,
            IWinLossFeedbackService winLossService,
            ICRMLogService logService,
            ITOControlFeedbackService turnoverService,
            IResultAmendmentService resultAmendmentService,
            IProblemsAccountFeedbackService problemsAccountFeedbackService,
            IFeedbackService feedbackService,
            ISynchronizeLicenseeService licenseeService,
            IConfiguration configuration)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.jobRunningChecker = jobRunningChecker;
            this.systemSettingService = systemSettingService;
            this.winLossService = winLossService;
            this.logService = logService;
            this.turnoverService = turnoverService;
            this.resultAmendmentService = resultAmendmentService;
            this.problemsAccountFeedbackService = problemsAccountFeedbackService;
            this.feedbackService = feedbackService;
            this.licenseeService = licenseeService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task ExecuteJobAsync()
        {
            try
            {
                AbnormalBetSystemSetting setting = await systemSettingService.GetAbnormalBetSettingAsync();
                if (!setting.ServiceFlag)
                {
                    logService.LogInformation("Abnormal Bet - Service is shutdown.");
                    return;
                }

                var isRunningLive = setting.JobStatus.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);
                var isRunningUAT = setting.JobStatusUAT.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);

                if (Environment == DefaultEnvironment)
                {
                    await AbnormalbetRunJobByEnviromentAsync(false, isRunningUAT, isRunningLive, setting, Environment);
                }
                else
                {
                    await AbnormalbetRunJobByEnviromentAsync(true, isRunningUAT, isRunningLive, setting, Environment);
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual async Task AbnormalbetRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, AbnormalBetSystemSetting setting, string Environment)
        {
            var LastRuntimeEnv = isUAT ? setting.LastRuntimeUAT : setting.LastRuntime;
            var LastRuntimeNameEnv = isUAT ? SystemSettingName.LastRuntimeUAT : SystemSettingName.LastRuntime;
            var JobStatusNameEnv = isUAT ? SystemSettingName.JobStatusUAT : SystemSettingName.JobStatus;
            var isRunning = isUAT ? isRunningUAT : isRunningLive;

            if (!isRunning)
            {
                await Task.WhenAll(
                         jobRunningChecker.MarkRunning(JobName.CreateFeedbackForVoidingAbnormalBet),
                         feedbackService.CreateFeedbackForVoidingAbnormalBetAsync(setting, isUAT, LastRuntimeEnv, LastRuntimeNameEnv,
                            JobStatusNameEnv, Environment)
                     );
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
            }
            else
            {
                isRunning = await jobRunningChecker.IsRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
                if (!isRunning && LastRuntimeEnv.AddMinutes(appSettings.RetryRuntime) < DateTime.Now)
                {
                    var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = JobStatusNameEnv, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = LastRuntimeNameEnv, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                        };
                    await systemSettingService.EditSystemSettingAsync(settingJobStatus);
                }
            }
        }

        public async Task WinLossExecuteJobAsync()
        {
            try
            {
                WinLossSystemSetting setting = await systemSettingService.GetWinLossSettingAsync();
                if (!setting.ServiceFlag)
                {
                    logService.LogInformation("Service Company Winloss is shutdown.");
                    return;
                }

                var isRunning = setting.JobStatus.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);

                if (!isRunning)
                {
                    await Task.WhenAll(
                        jobRunningChecker.MarkRunning(JobName.CreateFeedbackForWinLossLimit),
                        winLossService.CreateFeedbackForWinLossLimitAsync(setting)
                    );
                    await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForWinLossLimit);
                }
                else
                {
                    isRunning = await jobRunningChecker.IsRunning(JobName.CreateFeedbackForWinLossLimit);
                    if (!isRunning && setting.LastRuntime.AddMinutes(appSettings.RetryRuntime) < DateTime.Now)
                    {
                        logService.LogInformation("Rerun Company Winloss service.");
                        var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString(dateTimeParse) },
                        };
                        await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_WinLimitFB);
                    }
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForWinLossLimit);
                await logService.ErrorAsync(ex);
            }
        }

        public async Task TurnoverControlExecuteJobAsync()
        {
            try
            {
                logService.LogInformation("Start Service Turnover Controll!");

                WinLossSystemSetting turnOverSetting = await systemSettingService.GetTurnoverSettingAsync();
                if (!turnOverSetting.ServiceFlag)
                {
                    logService.LogInformation("Service Turnover Controll is shutdown.");
                    return;
                }

                var isRunning = turnOverSetting.JobStatus.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);

                if (!isRunning)
                {
                    await Task.WhenAll(
                        jobRunningChecker.MarkRunning(JobName.CreateFeedbackForTurnoverControl),
                        turnoverService.CreateFeedbackForTurnoverControlAsync(turnOverSetting)
                    );
                    await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForTurnoverControl);
                }
                else
                {
                    logService.LogInformation("Controll service is running.");
                    isRunning = await jobRunningChecker.IsRunning(JobName.CreateFeedbackForTurnoverControl);
                    if (!isRunning && turnOverSetting.LastRuntime.AddMinutes(appSettings.RetryRuntime) < DateTime.Now)
                    {
                        logService.LogInformation("Rerun Turnover Controll service.");
                        var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString(dateTimeParse)},
                        };
                        await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_TOControlFB);
                    }
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForTurnoverControl);
                await logService.ErrorAsync(ex);
            }
        }

        public async Task ResultAmendmentExecuteJobAsync()
        {
            try
            {
                logService.LogInformation("Start Service Result Amendment!");

                ResultAmendmentSetting resultAmendmentSetting = await systemSettingService.GetResultAmendmentSettingAsync();
                if (!resultAmendmentSetting.ServiceFlag)
                {
                    logService.LogInformation("Service Result Amendment is shutdown.");
                    return;
                }

                var isRunningLive = resultAmendmentSetting.JobStatus.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);
                var isRunningUAT = resultAmendmentSetting.JobStatusUAT.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);

                if (Environment == DefaultEnvironment)
                {
                    await ResultAmendmentRunJobByEnviromentAsync(false, isRunningUAT, isRunningLive, resultAmendmentSetting, Environment);
                }
                else
                {
                    await ResultAmendmentRunJobByEnviromentAsync(true, isRunningUAT, isRunningLive, resultAmendmentSetting, Environment);
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForResultAmendment);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual async Task ResultAmendmentRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, ResultAmendmentSetting resultAmendmentSetting, string Environment)
        {
            var LastRuntimeEnv = isUAT ? resultAmendmentSetting.LastRuntimeUAT : resultAmendmentSetting.LastRuntime;
            var LastRuntimeNameEnv = isUAT ? SystemSettingName.LastRuntimeUAT : SystemSettingName.LastRuntime;
            var JobStatusNameEnv = isUAT ? SystemSettingName.JobStatusUAT : SystemSettingName.JobStatus;
            var isRunning = isUAT ? isRunningUAT : isRunningLive;

            if (!isRunning)
            {
                await Task.WhenAll(
                         jobRunningChecker.MarkRunning(JobName.CreateFeedbackForResultAmendment),
                         resultAmendmentService.CreateFeedbackForResultAmendmentAsync(resultAmendmentSetting, isUAT, LastRuntimeEnv, LastRuntimeNameEnv,
                            JobStatusNameEnv, Environment)
                     );
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForResultAmendment);
            }
            else
            {
                logService.LogInformation("Result amendment service is running.");
                isRunning = await jobRunningChecker.IsRunning(JobName.CreateFeedbackForResultAmendment);
                if (!isRunning && LastRuntimeEnv.AddMinutes(appSettings.RetryRuntime) < DateTime.Now)
                {
                    logService.LogInformation("Update  status and return serive result amendment.");
                    var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = JobStatusNameEnv, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = LastRuntimeNameEnv, Value = DateTime.Now.ToString(dateTimeParse) },
                        };
                    await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ResultAmendment);
                }
            }
        }

        public async Task ProblemsAcccountExecuteJobAsync()
        {
            try
            {
                logService.LogInformation("Start Service Problems Account!");

                ProblemsAccountSetting problemsAccountSetting = await systemSettingService.GetProblemsAccountSettingAsync();
                if (!problemsAccountSetting.ServiceFlag)
                {
                    logService.LogInformation("Service Problems Account is shutdown.");
                    return;
                }

                var isRunningLive = problemsAccountSetting.JobStatus.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);
                var isRunningUAT = problemsAccountSetting.JobStatusUAT.Equals(JobStatus.Running, StringComparison.OrdinalIgnoreCase);

                if (Environment == DefaultEnvironment)
                {
                    await ProblemsAcccountRunJobByEnviromentAsync(false, isRunningUAT, isRunningLive, problemsAccountSetting, Environment);
                }
                else
                {
                    await ProblemsAcccountRunJobByEnviromentAsync(true, isRunningUAT, isRunningLive, problemsAccountSetting, Environment);
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForProblemsAccount);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual async Task ProblemsAcccountRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, ProblemsAccountSetting problemsAccountSetting, string Environment)
        {
            var LastRuntimeEnv = isUAT ? problemsAccountSetting.LastRuntimeUAT : problemsAccountSetting.LastRuntime;
            var LastRuntimeNameEnv = isUAT ? SystemSettingName.LastRuntimeUAT : SystemSettingName.LastRuntime;
            var JobStatusNameEnv = isUAT ? SystemSettingName.JobStatusUAT : SystemSettingName.JobStatus;
            var isRunning = isUAT ? isRunningUAT : isRunningLive;

            if (!isRunning)
            {
                await Task.WhenAll(
                    jobRunningChecker.MarkRunning(JobName.CreateFeedbackForProblemsAccount),
                    problemsAccountFeedbackService.CreateFeedbackForProblemsAccountAsync(
                            problemsAccountSetting, isUAT, LastRuntimeEnv, LastRuntimeNameEnv,
                            JobStatusNameEnv, Environment
                        )
                );
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForProblemsAccount);
            }
            else
            {
                logService.LogInformation("Problems account service is running.");
                isRunning = await jobRunningChecker.IsRunning(JobName.CreateFeedbackForProblemsAccount);
                if (!isRunning && LastRuntimeEnv.AddMinutes(appSettings.RetryRuntime) < DateTime.Now)
                {
                    logService.LogInformation("Update  status and return serive problems account.");
                    var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = JobStatusNameEnv, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = LastRuntimeNameEnv, Value = DateTime.Now.ToString(dateTimeParse) },
                        };
                    await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ProblemsAccount);
                }
            }
        }

        public async Task SynchronizeNewLicenseeOICExecuteJobAsync()
        {
            try
            {
                var licenseeInfo = await licenseeService.GetOICLicenseeInfo();
                CommandResult commandResult = await licenseeService.ImportLicenseeStatus(
                    licenseeInfo,
                    Environment);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation("Synchronize New Licensee OIC Successful!!!");
                }
                else
                {
                    logService.LogInformation(commandResult.Message);
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

    }
}