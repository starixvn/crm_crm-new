namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public interface ITOControllFeedbackService
    {
        Task CreateFeedbackForTurnoverControllAsync(WinLossSystemSetting turnOverSetting);
    }

    public class TOControllFeedbackService : ITOControllFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;

        public TOControllFeedbackService(
           IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback
            )
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.customerService = customerService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
        }

        public async Task CreateFeedbackForTurnoverControllAsync(WinLossSystemSetting turnOverSetting)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
            };
            logService.LogInformation(string.Format("Start run turnover controll serivce with last LastNotifyDate: {0}!", turnOverSetting.LastNotifyDate));
            await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_TOControlFB);
        }
    }
}
