namespace CRM.Services.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using CRM.Resources;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);

        Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command);

        Task<EditNoOfInquiry> GetNoOfInquiryByFeedbackIdAsync(int feedbackId);

        Task<CustomerFeedback> GetFeedbackByIdAsync(int feedbackId);

        Task<CommandResult> EditFeedbackAsync(EditFeedbackCommand command);
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IFeedbackRepository feedbackRepository;

        public FeedbackService(
            IBaseService baseService,
            ISettingService settingService,
            ICommonService commonService,
            IFeedbackRepository feedbackRepository)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.commonService = commonService;
            this.feedbackRepository = feedbackRepository;
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

        public async Task<EditNoOfInquiry> GetNoOfInquiryByFeedbackIdAsync(int feedbackId)
        {
            var criteria = new GetNoOfInquiryByFeedbackIdCriteria
            {
                FeedbackId = feedbackId
            };
            return await baseService.GetDataEntityAsync<EditNoOfInquiry>(criteria);
        }

        public async Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditFeedbackAsync(EditFeedbackCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}