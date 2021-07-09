namespace CRM.Services.Feedback
{
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Criteria.Setting;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using Fanex.NAP.Client.Helpers.Web;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);
        Task<CommandResult> EditNoInquiries(EditNoInquiries model);
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

                var siteSetting = await serviceSetting.GetSettingById(new GetSettingByIdCriteria
                {
                    SettingId = feedback.SiteID
                });
                feedback.SiteSetting.Name = siteSetting.Name;
                feedback.SiteSetting.Id = feedback.SiteID;
                feedback.HasRelated = feedback.RelatedCustomers.Any();
            }

            return feedback;
        }

        public Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param)
        {
            if (param.CustId == 0)
            {
                var criteria = new LatestFeedbackCriteria
                {
                    Username = param.Username,
                    Top = param.Top
                };

                return feedbackRepository.GetDeletedFeedbacksAsync(criteria);
            }
            else
            {
                var criteria = new LatestFeedbackByCustIdCriteria
                {
                    CustId = param.CustId,
                    Username = param.Username,
                    Top = param.Top
                };

                return feedbackRepository.GetDeletedFeedbacksAsync(criteria);
            }
        }

        public async Task<EditNoInquiries> GetNoInquiriesAsync(int id)
        {
            var criteria = new GetNoInquiriesCriteria
            {
                FeedbackID = id
            };

            return await baseService.GetDataEntityAsync<EditNoInquiries>(criteria);
        }

        public async Task<CommandResult> EditNoInquiries(EditNoInquiries model)
        {
            var command = new EditNoInquiriesCommand
            {
                UserId = napSession.UserId,
                IP = string.Empty,
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
