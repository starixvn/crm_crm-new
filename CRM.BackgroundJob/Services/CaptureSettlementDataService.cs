namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.CaptureSettlementData;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Models;
    using CRM.Core.Services;

    public interface ICaptureSettlementDataService
    {
        Task<IEnumerable<SiteDbConfig>> GetInitialSiteDbConfigsAsync(string environment);

        Task<SettlResultHistory> GetSessionByDateAsync(string environment, DateTime FDTime, int SiteDBGroupID);

        Task InsertDataLoadAsync(string environment, string JSSettlResultHist);
    }

    public class CaptureSettlementDataService : ICaptureSettlementDataService
    {
        private readonly IBaseService baseService;

        public CaptureSettlementDataService(IBaseService baseService) {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<SiteDbConfig>> GetInitialSiteDbConfigsAsync(string environment)
        {
            var criteria = new GetInitalSiteDBConfigCriteria
            {
                Environment = environment
            };
            return await baseService.GetSiteDbConfigAsync(criteria);
        }

        public async Task<SettlResultHistory> GetSessionByDateAsync(string environment, DateTime FDTime, int SiteDBGroupID)
        {
            var criteria = new GetSessionByDateCriteria
            {
                Environment = environment,
                FDTime = FDTime,
                SiteDBGroupID = SiteDBGroupID
            };
            return await baseService.GetDataEntityAsync<SettlResultHistory>(criteria);
        }

        public async Task InsertDataLoadAsync(string environment, string JSSettlResultHist)
        {
            var command = new InsertDataLoadCommand
            {
                Environment = environment,
                JSSettlResultHist = JSSettlResultHist
            };
            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
