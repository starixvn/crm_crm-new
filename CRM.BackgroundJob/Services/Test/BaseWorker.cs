namespace CRM.BackgroundJob.Services.Test
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Services;
    using Microsoft.Extensions.Hosting;
    using ONEbook.UM.Services;

    public class BaseWorker : BackgroundService
    {
        private readonly IMaintenanceService maintenanceService;
        private readonly ICRMLogService logService;

        private Timer timer;
        private bool isRunning;

        protected JobSetting jobSetting;

        public BaseWorker(
            IMaintenanceService maintenanceService,
            ICRMLogService logService)
        {
            this.maintenanceService = maintenanceService;
            this.logService = logService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            timer = new Timer(Execute,
               null,
               TimeSpan.Zero,
               TimeSpan.FromSeconds(jobSetting.TimeInterval));

            await Task.CompletedTask;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {

            logService.LogInformation($"{jobSetting.JobName}: Service Starting");
            return base.StartAsync(cancellationToken);
        }

        private async void Execute(object state)
        {
            try
            {
                if (!isRunning
                    && jobSetting.IsEnabled
                    && (!jobSetting.HasCheckUM || !IsUM()))
                {
                    isRunning = true;
                    logService.LogInformation($"{jobSetting.JobName}: Doing...");
                    await ExecuteJobAsync();
                    logService.LogInformation($"{jobSetting.JobName}: Done.");
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
                logService.LogInformation($"{jobSetting.JobName}: Error - {ex}");
            }
            finally
            {
                isRunning = false;
            }
        }

        public virtual async Task ExecuteJobAsync()
        {
            await Task.CompletedTask;
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            logService.LogInformation($"{jobSetting.JobName}: Stopping Service");
            timer?.Change(Timeout.Infinite, 0);

            await base.StopAsync(cancellationToken);
        }

        public override void Dispose()
        {
            logService.LogInformation($"{jobSetting.JobName}: Disposing Service");
            timer.Dispose();
            base.Dispose();
        }

        private bool IsUM()
        {
            var maintanceTime = maintenanceService.GetUnderMaintenanceTime();
            return maintanceTime.IsUnderMaintenanceTime;
        }
    }
}
