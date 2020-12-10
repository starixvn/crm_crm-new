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
        Task TurnoverControlExecuteJobAsync();
    }

    public class AutoWinLossFeedbackService : IAutoWinLossFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IJobRunningChecker jobRunningChecker;
        private readonly ISystemSettingService systemSettingService;
        private readonly IWinLossFeedbackService winLossService;
        private readonly ITOControlFeedbackService turnoverService;
        private readonly ICRMLogService logService;

        public AutoWinLossFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IJobRunningChecker jobRunningChecker,
            ISystemSettingService systemSettingService,
            IWinLossFeedbackService winLossService,
            ICRMLogService logService,
            ITOControlFeedbackService turnoverService)
        {
            this.appSettings = appSettings.Value;
            this.jobRunningChecker = jobRunningChecker;
            this.systemSettingService = systemSettingService;
            this.winLossService = winLossService;
            this.logService = logService;
            this.turnoverService = turnoverService;
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
                           new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
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
                           new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
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
    }
}