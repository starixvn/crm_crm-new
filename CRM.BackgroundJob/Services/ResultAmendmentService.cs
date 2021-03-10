namespace CRM.BackgroundJob.Services
{
    using CRM.BackgroundJob.Models.ResultAmendment;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IResultAmendmentService
    {
        Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting);
    }
    public class ResultAmendmentService : IResultAmendmentService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;

        //private readonly string descTemplateXml = "TODesctiptionTemplate.xml";
        //private readonly string solTemplateXml = "TOSolutionTemplate.xml";

#pragma warning disable S107 // Methods should not have too many parameters

        public ResultAmendmentService(
           IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback
            )
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.customerService = customerService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
        }
        public async Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting)
        {
            logService.LogInformation(string.Format("Start run result amendment serivce with last LastLogID: {0}!", resultAmendmentSetting.LastLogId));

            var settingJobStatus = new List<SystemSettingItem>
                {
                    new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                    new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                };

            await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ResultAmendment);

            logService.LogInformation("After Edit job Result Amendment!");
        }
    }
}
