namespace CRM.Services.Feedback
{
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Models;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(GetLatestFeedbackParam param);

    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService serviceSetting;
        private readonly IFeedbackRepository feedbackRepository;

        public FeedbackService(IBaseService baseService, ISettingService serviceSetting, IFeedbackRepository feedbackRepository)
        {
            this.baseService = baseService;
            this.serviceSetting = serviceSetting;
            this.feedbackRepository = feedbackRepository;
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
    }
}
