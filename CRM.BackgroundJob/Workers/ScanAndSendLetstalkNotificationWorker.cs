namespace CRM.BackgroundJob.Workers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Extensions;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Microsoft.Extensions.Options;
    using ONEbook.UM.Services;

    public class ScanAndSendLetstalkNotificationWorker : BaseWorker
    {
        private readonly ISendNotificationService sendNotificationService;

        public ScanAndSendLetstalkNotificationWorker(
            ISendNotificationService sendNotificationService,
            IMaintenanceService maintenanceService,
            IOptions<List<JobSetting>> jobSettings,
            ICRMLogService logService)
                : base(maintenanceService, logService)
        {
            this.sendNotificationService = sendNotificationService;
            jobSetting = JobHelper.GetJobConfig(jobSettings.Value, JobName.ScanAndSendLetstalkNotification);
        }

        public override async Task ExecuteJobAsync()
        {
            await sendNotificationService.ScanAndSendMessageToBotEndpointAsync();
        }
    }
}