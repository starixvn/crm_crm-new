namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Options;

    public interface IWinLossFeedbackService
    {
        Task CreateFeedbackForWinLossLimitAsync(WinLossSystemSetting setting);
    }

    public class WinLossFeedbackService : IWinLossFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly IMessageService messageService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly IFeedbackTicketVoidingService ticketVoidingService;

#pragma warning disable S107 // Methods should not have too many parameters
        public WinLossFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            IMessageService messageService,
            ICustomerService customerService,
            ICRMLogService logService,
            IFeedbackTicketVoidingService ticketVoidingService)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.messageService = messageService;
            this.customerService = customerService;
            this.logService = logService;
            this.ticketVoidingService = ticketVoidingService;
        }

        public async Task CreateFeedbackForWinLossLimitAsync(WinLossSystemSetting setting)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") }
            };
            await systemSettingService.EditSystemSettingAsync(settingJobStatus);
        }
    }
}
