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

    public class MonitorLetstalkWorker : BaseWorker
    {
        private readonly IMonitorService monitorService;

        public MonitorLetstalkWorker(
            IMonitorService monitorService,
            IMaintenanceService maintenanceService,
            IOptions<List<JobSetting>> jobSettings,
            ICRMLogService logService)
                : base(maintenanceService, logService)
        {
            this.monitorService = monitorService;
            jobSetting = JobHelper.GetJobConfig(jobSettings.Value, JobName.MonitorLetstalkService);
        }

        public override async Task ExecuteJobAsync()
        {
            await monitorService.MonitorLetstalkService();
        }
    }
}