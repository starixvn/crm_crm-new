namespace CRM.Services.Dashboard
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Dashboard;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Feedback;
    using CRM.Models.Redemption;

    public interface IDashboardService
    {
        Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria);
        Task<IEnumerable<CustomerLogInfo>> GetRedemptionLogsAsync(GetRedemptionLogsCriteria criteria);
        Task<IEnumerable<CommunicationLog>> GetCommunicationLogsAsync(GetCommunicationLogsCriteria criteria);
    }

    public class DashboardService : IDashboardService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public DashboardService(
            IBaseService baseService,
            ICommonService commonService
        )
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria)
        {
            return await baseService.GetDataAsync<string>(criteria);
        }

        public async Task<IEnumerable<CustomerLogInfo>> GetRedemptionLogsAsync(GetRedemptionLogsCriteria criteria)
        {
            var redemptionLogs = await baseService.GetDataAsync<CustomerLogInfo>(criteria);
            foreach (var redemptionLog in redemptionLogs)
            {
                redemptionLog.ClaimTime = commonService.ConvertToClientDateTime(redemptionLog.ClaimTime);
            }
            return redemptionLogs;
        }

        public async Task<IEnumerable<CommunicationLog>> GetCommunicationLogsAsync(GetCommunicationLogsCriteria criteria)
        {
            var (communicationLogs, settings) = await baseService.FetchMultipleAsync<CommunicationLog, FeedbackSettingRelation>(criteria);
            foreach (var communicationLog in communicationLogs)
            {
                communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
                communicationLog.Settings = settings.Where(x => x.FeedbackId == communicationLog.FeedbackId).ToList();
            }
            communicationLogs = communicationLogs.Where(x => x.Settings.Count() > 0);
            return communicationLogs;
        }
    }
}
