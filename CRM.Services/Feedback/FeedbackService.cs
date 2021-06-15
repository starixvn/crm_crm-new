namespace CRM.Services.Feedback
{
    using CRM.Core.Services;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        //Task<IEnumerable<LatestFeedback>> GetLatestFeedbackAsync(GetFeedbackParam param);

    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;

        public FeedbackService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        //public Task<IEnumerable<Feedback>> GetLatestFeedbackAsync(GetFeedbackParam param)
        //{
        //    throw new System.NotImplementedException();
        //}
    }
}
