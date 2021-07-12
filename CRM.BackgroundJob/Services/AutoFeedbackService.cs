namespace Fanex.CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    public interface IAutoFeedbackService
    {
        Task ExecuteJobAsync();
    }

    public class AutoFeedbackService : IAutoFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IJobRunningChecker jobRunningChecker;
        private readonly ISystemSettingService systemSettingService;
        private readonly IFeedbackService feedbackService;
        private readonly ICRMLogService logService;
        private readonly string Environment;
        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public AutoFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IJobRunningChecker jobRunningChecker,
            ISystemSettingService systemSettingService,
            IFeedbackService feedbackService,
            ICRMLogService logService,
            IConfiguration configuration)
        {
            this.appSettings = appSettings.Value;
            this.jobRunningChecker = jobRunningChecker;
            this.systemSettingService = systemSettingService;
            this.feedbackService = feedbackService;
            this.logService = logService;
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
    }
}