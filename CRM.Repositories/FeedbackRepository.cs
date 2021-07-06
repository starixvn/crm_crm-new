namespace CRM.Repositories
{
    using CRM.Core.Models;
    using CRM.Models.Feedback;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IFeedbackRepository
    {
        Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbacksAsync(ICriteria criteria);
    }

    public class FeedbackRepository : IFeedbackRepository
    {
        public async Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbacksAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (IMultiResultReader multi = await db.QueryMultipleAsync(criteria))
                {
                    var feedbacks = multi.Read<DeletedFeedback>();
                    var settings = multi.Read<SettingItems>();

                    return GenerateDeletedFeedbackWithSetting(feedbacks, settings);
                }
            }
        }

        private static IEnumerable<DeletedFeedback> GenerateDeletedFeedbackWithSetting(
            IEnumerable<DeletedFeedback> feedbacks,
            IEnumerable<SettingItems> settings)
        {
            Func<DeletedFeedback, List<SettingItems>, DeletedFeedback> regenerateDeletedFeedback = delegate (DeletedFeedback f, List<SettingItems> s)
            {
                f.Settings = s;
                return f;
            };
            var result = from f in feedbacks
                         join s in settings on f.FeedbackId equals s.FeedbackID
                         select new { f, s } into t1
                         group t1 by t1.f.FeedbackId into g
                         select regenerateDeletedFeedback(g.FirstOrDefault().f, g.Select(i => i.s).ToList());

            return result.ToList();
        }
    }
}
