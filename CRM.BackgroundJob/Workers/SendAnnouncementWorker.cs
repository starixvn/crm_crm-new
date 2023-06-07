namespace CRM.BackgroundJob.Workers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Extensions;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Services;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Fanex.CRM.BackgroundJob.Constants;
    using Microsoft.Extensions.Options;
    using ONEbook.UM.Services;

    public class SendAnnouncementWorker : BaseWorker
    {
        private readonly ISendAnnouncementService sendService;

        public SendAnnouncementWorker(
            ISendAnnouncementService sendService,
            IMaintenanceService maintenanceService,
            IOptions<List<JobSetting>> jobSettings,
            ICRMLogService logService)
                : base(maintenanceService, logService)
        {
            this.sendService = sendService;
            jobSetting = JobHelper.GetJobConfig(jobSettings.Value, JobName.ScanAndSendLetstalkNotification);
        }

        public override async Task ExecuteJobAsync()
        {
            await sendService.ScanThenSendAsnyc();
        }
    }
}