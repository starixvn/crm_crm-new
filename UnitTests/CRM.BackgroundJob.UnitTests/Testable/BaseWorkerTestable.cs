namespace CRM.BackgroundJob.UnitTests.Testable
{
    using System.Threading;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Wokers;
    using CRM.Core.Services;
    using ONEbook.UM.Services;

    public class BaseWorkerTestable : BaseWorker
    {
        public BaseWorkerTestable(
            IMaintenanceService maintenanceService,
            ICRMLogService logService)
            : base(maintenanceService,
            logService)
        {

        }

        public async Task Public_ExecuteAsync(CancellationToken stoppingToken)
        {
            await base.ExecuteAsync(stoppingToken);
        }

        public async Task Public_StartAsync(CancellationToken cancellationToken)
        {
            await base.StartAsync(cancellationToken);
        }
       
    }
}
