namespace CRM.Services.Feedback
{
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using Fanex.NAP.Client.Helpers.Web;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);
        Task<CommandResult> UpdateQuickUpdateFeedback(EditQuickUpdateFeedback model);
        Task<EditQuickUpdateFeedback> GetNoInquiriesAsync(int id);
        Task<CustomerFeedback> GetFeedbackById(GetFeedbackByIdCriteria criteria);
    }

    public class FeedbackService: IFeedbackService
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

        public Task<CustomerFeedback> GetFeedbackById(GetFeedbackByIdCriteria criteria)
        {
            var feedback = feedbackRepository.GetFeedbackById(criteria);

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

        public async Task<EditQuickUpdateFeedback> GetNoInquiriesAsync(int id)
        {
            var criteria = new GetQuickUpdateFeedbackCriteria
            {
                FeedbackID = id
            };

            return await baseService.GetDataEntityAsync<EditQuickUpdateFeedback>(criteria);
        }

        public async Task<CommandResult> UpdateQuickUpdateFeedback(EditQuickUpdateFeedback model)
        {
            var command = new UpdateQuickUpdateFeedbackCommand
            {
                UserId = napSession.UserId,
                IP = string.Empty,
                FeedbackID = model.FeedbackID,
                NoInquiries = model.NoInquiries
            };

            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
