namespace CRM.Services.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using CRM.Resources;
    using Fanex.NAP.Client.Helpers.Web;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);

        Task<CommandResult> EditNoInquiries(EditNoInquiries model, string clientIP);

        Task<EditNoInquiries> GetNoInquiriesAsync(int feedbackId);

        Task<CustomerFeedback> GetFeedbackByIdAsync(int feedbackId);

        Task<CommandResult> EditFeedbackAsync(EditFeedbackCommand command);
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IFeedbackRepository feedbackRepository;
        private readonly INapSession napSession;

        public FeedbackService(
            IBaseService baseService,
            ISettingService settingService,
            ICommonService commonService,
            INapSession napSession,
            IFeedbackRepository feedbackRepository)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.commonService = commonService;
            this.feedbackRepository = feedbackRepository;
            this.napSession = napSession;
        }

        public async Task<CustomerFeedback> GetFeedbackByIdAsync(int feedbackId)
        {
            var criteria = new GetFeedbackByIdCriteria
            {
                FeedbackId = feedbackId
            };
            var (feedbackInfos, relatedCustomers, settingItems) = await baseService.FetchMultipleAsync<CustomerFeedback, RelatedCustomer, FeedbackSettingRelation>(criteria);
            CustomerFeedback feedback = null;

            if (feedbackInfos.Any())
            {
                feedback = feedbackInfos.First();
                feedback.RelatedCustomers = relatedCustomers;
                feedback.Settings = settingItems.ToList();

                var siteSetting = await settingService.GetSiteByIdAsync(feedback.SiteID);
                feedback.SiteSetting = new Models.Common.Site
                {
                    Id = siteSetting.Id,
                    Name = siteSetting.Name
                };
                feedback.HasRelated = feedback.RelatedCustomers.Any();
            }

            return feedback;
        }

        public async Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param)
        {
            var criteria = new LatestFeedbackCriteria
            {
                Top = param.Top
            };
            IEnumerable<DeletedFeedback> feedbacks = await feedbackRepository.GetDeletedFeedbacksAsync(criteria);
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusHash = statusList.ToDictionary(k => k.StatusId, v => v.Name);
            statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
                feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
                feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);

                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
            }

            return feedbacks;
        }

        public async Task<EditNoInquiries> GetNoInquiriesAsync(int feedbackId)
        {
            var criteria = new GetNoInquiriesCriteria
            {
                FeedbackId = feedbackId
            };

            return await baseService.GetDataEntityAsync<EditNoInquiries>(criteria);
        }

        public async Task<CommandResult> EditNoInquiries(EditNoInquiries model, string clientIP)
        {
            var command = new EditNoInquiriesCommand
            {
                UserId = napSession.UserId,
                IP = clientIP,
                FeedbackID = model.FeedbackID,
                NoInquiries = model.NoInquiries
            };

            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditFeedbackAsync(EditFeedbackCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}