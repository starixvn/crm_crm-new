namespace Fanex.CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Models.WinLossLimit;
    using global::CRM.BackgroundJob.Services;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Options;

    public interface IAutoWinLossFeedbackService
    {
        Task WinLossExecuteJobAsync();
    }

    public class AutoWinLossFeedbackService : IAutoWinLossFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IJobRunningChecker jobRunningChecker;
        private readonly ISystemSettingService systemSettingService;
        private readonly IWinLossFeedbackService winLossService;
        private readonly ICRMLogService logService;

        public AutoWinLossFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IJobRunningChecker jobRunningChecker,
            ISystemSettingService systemSettingService,
            IWinLossFeedbackService winLossService,
            ICRMLogService logService)
        {
            this.appSettings = appSettings.Value;
            this.jobRunningChecker = jobRunningChecker;
            this.systemSettingService = systemSettingService;
            this.winLossService = winLossService;
            this.logService = logService;
        }

        public async Task WinLossExecuteJobAsync()
        {
            try
            {
                WinLossSystemSetting setting = await systemSettingService.GetWinLossSettingAsync();
                if (!setting.ServiceFlag)
                {
                    logService.LogInformation("Service is shutdown.");
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
                        logService.LogInformation("Return service.");
                        var settingJobStatus = new List<SystemSettingItem>
                        {
                           new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                           new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                           new SystemSettingItem { SettingName = SystemSettingName.LastLogID, Value = setting.LastLogID.ToString() }
                        };
                        await systemSettingService.EditSystemSettingAsync(settingJobStatus);
                    }
                }
            }
            catch (Exception ex)
            {
                await jobRunningChecker.ClearRunning(JobName.CreateFeedbackForWinLossLimit);
                await logService.ErrorAsync(ex);
            }
        }
    }
}