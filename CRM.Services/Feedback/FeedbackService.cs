namespace CRM.Services.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using Fanex.NAP.Client.Helpers.Web;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);

        Task<CommandResult> EditNoInquiries(EditNoInquiries model, string clientIP);

        Task<EditNoInquiries> GetNoInquiriesAsync(int id);

        Task<CustomerFeedback> GetFeedbackById(GetFeedbackByIdCriteria criteria);

        Task<CommandResult> EditFeedbackAsync(EditFeedbackCommand command);
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService serviceSetting;
        private readonly IFeedbackRepository feedbackRepository;
        private readonly INapSession napSession;

        public FeedbackService(
            IBaseService baseService,
            ISettingService serviceSetting,
            INapSession napSession,
            IFeedbackRepository feedbackRepository)
        {
            this.baseService = baseService;
            this.serviceSetting = serviceSetting;
            this.feedbackRepository = feedbackRepository;
            this.napSession = napSession;
        }

        public async Task<CustomerFeedback> GetFeedbackById(GetFeedbackByIdCriteria criteria)
        {
            var (feedbackInfo, relatedCustomer, settingItems) = await baseService.FetchMultipleAsync<CustomerFeedback, RelatedCustomer, SettingItems>(criteria);
            CustomerFeedback feedback = null;

            if (feedbackInfo.Any())
            {
                feedback = feedbackInfo.FirstOrDefault();
                feedback.RelatedCustomers = relatedCustomer;
                feedback.Settings = settingItems.ToList();

                var siteSetting = await serviceSetting.GetSiteByIdAsync(feedback.SiteID);
                feedback.SiteSetting = new Models.Common.Site
                {
                    Id = siteSetting.Id,
                    Name = siteSetting.Name
                };
                feedback.HasRelated = feedback.RelatedCustomers.Any();
            }

            return feedback;
        }

        public Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param)
        {
            var criteria = new LatestFeedbackCriteria
            {
                Top = param.Top
            };

            return feedbackRepository.GetDeletedFeedbacksAsync(criteria);
        }

        public async Task<EditNoInquiries> GetNoInquiriesAsync(int id)
        {
            var criteria = new GetNoInquiriesCriteria
            {
                FeedbackID = id
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