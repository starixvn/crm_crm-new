namespace CRM.BackgroundJob.Wokers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Extensions;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using ONEbook.UM.Services;

    public class SynchronizeNewLicenseeWorker : BaseWorker
    {
        private readonly IAutoFeedbackService autoFeedbackService;

        public SynchronizeNewLicenseeWorker(
            IAutoFeedbackService autoFeedbackService,
            IMaintenanceService maintenanceService,
            IOptions<List<JobSetting>> jobSettings,
            ICRMLogService logService)
                : base(maintenanceService, logService)
        {
            this.autoFeedbackService = autoFeedbackService;
            jobSetting = JobHelper.GetJobConfig(jobSettings.Value, JobName.SynchronizeNewLicenseeOICToSiteSetting);
        }

        public override async Task ExecuteJobAsync()
        {
            await autoFeedbackService.SynchronizeNewLicenseeOICExecuteJobAsync();
        }
    }
}