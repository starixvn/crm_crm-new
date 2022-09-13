namespace CRM.BackgroundJob.Workers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Services;
    using Microsoft.Extensions.Hosting;
    using ONEbook.UM.Services;

    public abstract class BaseWorker : BackgroundService
    {
        private readonly IMaintenanceService maintenanceService;
        private readonly ICRMLogService logService;
        protected JobSetting jobSetting;

        protected BaseWorker(
            IMaintenanceService maintenanceService,
            ICRMLogService logService)
        {
            this.maintenanceService = maintenanceService;
            this.logService = logService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            const byte MillisecondsDelay = 10;
            await Task.Delay(MillisecondsDelay).ConfigureAwait(false);

            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    await RunJobAsync();

                    await Task.Delay(TimeSpan.FromSeconds(jobSetting.TimeInterval), stoppingToken);
                }

                logService.LogInformation($"Execution ended. Cancelation token cancelled = {stoppingToken.IsCancellationRequested}");
            }
            catch (Exception ex)
            {
                logService.LogInformation(ex.Message);
            }
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            logService.LogInformation("StartAsync");
            return base.StartAsync(cancellationToken);
        }

        public virtual async Task RunJobAsync()
        {
            try
            {
                if (jobSetting.IsEnabled
                    && (!jobSetting.HasCheckUM || !IsUM()))
                {
                    await ExecuteJobAsync();
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
                logService.LogInformation($"{jobSetting.JobName}: Error - {ex}");
            }
        }

        public abstract Task ExecuteJobAsync();

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            logService.LogInformation($"{jobSetting.JobName}: Stopping Service");

            await base.StopAsync(cancellationToken);
        }

        public override void Dispose()
        {
            logService.LogInformation($"{jobSetting.JobName}: Disposing Service");
            base.Dispose();
        }

        private bool IsUM()
        {
            var maintanceTime = maintenanceService.GetUnderMaintenanceTime();
            return maintanceTime.IsUnderMaintenanceTime;
        }
    }
}