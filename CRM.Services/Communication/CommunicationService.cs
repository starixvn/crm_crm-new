namespace CRM.Services.Communication
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Models.Common;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;

    public interface ICommunicationService
    {
        Task<IEnumerable<CommunicationLog>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria);

        Task<CommunicationLog> GetLogByFeedbackIdAsync(int id, int modeId);
    }

    public class CommunicationService : ICommunicationService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;

        public CommunicationService(IBaseService baseService, ICommonService commonService, ISettingService settingService)
        {
            this.baseService = baseService;
            this.commonService = commonService;
            this.settingService = settingService;
        }

        public async Task<IEnumerable<CommunicationLog>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var (communicationLogInfos, settingItems) = await baseService.FetchMultipleAsync<CommunicationLog, SettingItem>(criteria);
            foreach (var communicationLog in communicationLogInfos)
            {
                communicationLog.CommunicationSettings = settingItems.Where(x => x.FeedbackId == communicationLog.FeedbackId).ToList();
                communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
                communicationLog.RelatedCustomers = communicationLog.RelatedCustomers.OrderBy(x => x.Username);
            }

            return communicationLogInfos;
        }

        public async Task<CommunicationLog> GetLogByFeedbackIdAsync(int id, int modeId)
        {
            var criteria = new GetLogByFeedbackIdCriteria
            {
                FeedbackId = id,
                Mode = modeId
            };

            var (communicationLogInfos, relatedCustomers, settingItems) = 
                await baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(criteria);
            CommunicationLog communicationLog = null;

            if (communicationLogInfos.Any())
            {
                communicationLog = communicationLogInfos.First();
                communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
                communicationLog.ResolutionDate = commonService.ConvertToClientDateTime(communicationLog.ResolutionDate);
                communicationLog.SolveDate = commonService.ConvertToClientDateTime(communicationLog.SolveDate);
                communicationLog.RelatedCustomers = relatedCustomers.OrderBy(x => x.Username);
                communicationLog.Settings = settingItems.ToList();

                var siteSetting = await settingService.GetSiteByIdAsync(communicationLog.SiteId);
                communicationLog.SiteSetting = new Site
                {
                    Id = siteSetting.Id,
                    Name = siteSetting.Name
                };
            }

            return communicationLog;
        }
    }
}