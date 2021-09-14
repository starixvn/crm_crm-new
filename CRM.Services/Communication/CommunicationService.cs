namespace CRM.Services.Communication
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Models.CommunicationLogs;

    public interface ICommunicationService
    {
        Task<IEnumerable<CommunicationLog>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria);
    }

    public class CommunicationService : ICommunicationService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;

        public CommunicationService(IBaseService baseService, ISettingService settingService)
        {
            this.baseService = baseService;
            this.settingService = settingService;
        }

        public async Task<IEnumerable<CommunicationLog>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria)
        {
            var (communicationLogInfos, settingItems) = await baseService.FetchMultipleAsync<CommunicationLog, CommunicationSettingRelation>(criteria);
            if (communicationLogInfos.Any())
            {
                foreach (var communicationLog in communicationLogInfos)
                {
                    communicationLog.CommunicationSettings = settingItems.Where(x => x.FeedbackId == communicationLog.FeedbackId).ToList();
                }
            }
            return communicationLogInfos;
        }
    }
}
