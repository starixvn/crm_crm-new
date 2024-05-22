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
            logService.LogInformation($"{jobSetting.JobName}: StartAsync");
            return base.StartAsync(cancellationToken);
        }

        public virtual async Task RunJobAsync()
        {
            try
            {
                var isUM = await IsUM();
                DateTime today = DateTime.Today;
                DateTime tomorrow = today.AddDays(1);
                bool areWeekends = AreWeekends(today, tomorrow);
                if (jobSetting.IsEnabled
                    && (!jobSetting.HasCheckUM || !isUM) && (!areWeekends || !jobSetting.IsDisableAtWeekend))
                {
                    logService.LogInformation($"{jobSetting.JobName} running");
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

        private async Task<bool> IsUM()
        {
            var maintanceTime = await maintenanceService.GetUnderMaintenanceTimeAsync();
            return maintanceTime.IsUnderMaintenanceTime;
        }

        private static bool IsWeekend(DateTime date)
        {
            return date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
        }

        private static bool AreConsecutiveDays(DateTime date1, DateTime date2)
        {
            return (date2 - date1).TotalDays == 1;
        }

        private static bool AreWeekends(DateTime date1, DateTime date2)
        {
            return IsWeekend(date1) && IsWeekend(date2) && AreConsecutiveDays(date1, date2);
        }
    }
}