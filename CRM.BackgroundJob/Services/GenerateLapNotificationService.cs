namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.GenerateLapNotification;
    using CRM.BackgroundJob.Criteria.GenerateResultAmendment;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Services;
    using Newtonsoft.Json;

    public interface IGenerateLapNotificationService
    {
        Task<IEnumerable<SettlementRemotingRefInfo>> GetPrepareGenLapNotificationAsync();

        Task InsertGenLapResultAmendmentAsync(IEnumerable<SettlementRemotingRefInfo> jSRemotingRef);
    }

    public class GenerateLapNotificationService : IGenerateLapNotificationService
    {
        private readonly IBaseService baseService;

        public GenerateLapNotificationService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<SettlementRemotingRefInfo>> GetPrepareGenLapNotificationAsync()
        {
            var criteria = new GetPrepareGenLapNotificationCriteria();
            return await baseService.GetDataAsync<SettlementRemotingRefInfo>(criteria);
        }

        public async Task InsertGenLapResultAmendmentAsync(IEnumerable<SettlementRemotingRefInfo> jSRemotingRef)
        {
            var command = new InsertGenLapResultAmendmentCommand
            {
                JSRemotingRef = JsonConvert.SerializeObject(jSRemotingRef)
            };
            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
