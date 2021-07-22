namespace CRM.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Models.Feedback;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public interface IFeedbackRepository
    {
        Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbackAsync(ICriteria criteria);
    }

    public class FeedbackRepository : IFeedbackRepository
    {
        public async Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbackAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (IMultiResultReader multi = await db.QueryMultipleAsync(criteria))
                {
                    var feedbacks = multi.Read<DeletedFeedback>();
                    var settings = multi.Read<FeedbackSettingRelation>();

                    foreach (var feedback in feedbacks)
                    {
                        feedback.Settings = settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList();
                    }

                    return feedbacks;
                }
            }
        }
    }
}