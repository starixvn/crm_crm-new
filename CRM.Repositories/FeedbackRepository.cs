namespace CRM.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Models;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Models.Report.FeedbackStatistic;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public interface IFeedbackRepository
    {
        Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbackAsync(ICriteria criteria);
        Task<IEnumerable<DeletedFeedbackStatistic>> GetDeletedFeedbackStatisticAsync(ICriteria criteria);
        Task<FeedbackStatisticInfo> GetFeedbackStatisticAsync(ICriteria criteria);
        Task<CustomerFeedbackModel> GetCustomerFeedbackByIdAsync(ICriteria criteria);
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

        public async Task<CustomerFeedbackModel> GetCustomerFeedbackByIdAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (IMultiResultReader multi = await db.QueryMultipleAsync(criteria))
                {
                    var customerFeedbackModel = new CustomerFeedbackModel
                    {
                        CustomerFeedback = multi.Read<CustomerFeedback>(),
                        FeedbackCommunicationTool = multi.Read<LatestFeedbackCommunicationTool>(),
                        FeedbackSettingRelation = multi.Read<FeedbackSettingRelation>(),
                        RelatedCustomerPermission = multi.Read<RelatedCustomerPermission>()
                    };

                    return customerFeedbackModel;
                }
            }
        }

        public async Task<IEnumerable<DeletedFeedbackStatistic>> GetDeletedFeedbackStatisticAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (IMultiResultReader multi = await db.QueryMultipleAsync(criteria))
                {
                    var feedbacks = multi.Read<DeletedFeedbackStatistic>();
                    var settings = multi.Read<FeedbackSettingRelation>();

                    foreach (var feedback in feedbacks)
                    {
                        feedback.Settings = settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList();
                        feedback.RelatedCustomer = string.IsNullOrEmpty(feedback.RelatedCustomer) ? "" : string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
                    }

                    return feedbacks;
                }
            }
        }

        public async Task<FeedbackStatisticInfo> GetFeedbackStatisticAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (IDataReader reader = await db.ExecuteReaderAsync(criteria))
                {
                    return ReadFeedbackStatistic(reader);
                }
            }
        }

        private static FeedbackStatisticInfo ReadFeedbackStatistic(IDataReader reader)
        {
            var userNames = new List<BaseModel>();
            for (int i = 4; i < reader.FieldCount; i++)
            {
                userNames.Add(new BaseModel { Name = reader.GetName(i) });
            }

            var userNamesCount = userNames.Count;
            var grandTotals = new int[userNamesCount];
            var report = new FeedbackStatisticInfo { 
                Usernames = userNames,
                FeedbackCategories = new List<FeedbackCategory>(),
                GrandTotals = grandTotals 
            };
            var previousCategory = 0;
            var categoryId = 0;
            FeedbackCategory feedbackCategory = null;
            while (reader.Read())
            {
                categoryId = (int)reader["MainCategoryId"];
                if (categoryId != previousCategory)
                {
                    previousCategory = categoryId;
                    feedbackCategory = new FeedbackCategory
                    {
                        Id = (int)(reader["MainCategoryId"]),
                        Name = (string)reader["MainCategory"],
                        FeedbackSubcategories = new List<FeedbackSubcategory>(),
                        SubTotal = InitializeSubTotal(userNamesCount)
                    };

                    report.FeedbackCategories.Add(feedbackCategory);
                }

                if (feedbackCategory != null)
                {
                    var feedbackSubcategory = new FeedbackSubcategory
                    {
                        Id = (int)(reader["SubCategoryId"]),
                        Name = (string)(reader["SubCategory"]),
                        Resolves = new List<int>(),
                    };

                    for (int i = 0; i < userNamesCount; i++)
                    {
                        var resolve = (int)(reader[userNames[i].Name]);
                        feedbackSubcategory.Resolves.Add(resolve);
                        feedbackCategory.SubTotal.Resolves[i] += resolve;
                        grandTotals[i] += resolve;
                    }

                    feedbackCategory.FeedbackSubcategories.Add(feedbackSubcategory);
                }
            }

            ReadUsernameIds(reader, report);
            return report;
        }

        private static void ReadUsernameIds(IDataReader reader, FeedbackStatisticInfo report)
        {
            if (reader.NextResult())
            {
                int index = 0;
                while (reader.Read())
                {
                    report.Usernames[index++].Id = (int)(reader["Item"]);
                }
            }
        }

        private static FeedbackSubcategory InitializeSubTotal(int length)
        {
            var resolves = Enumerable.Repeat(0, length).ToList();
            return new FeedbackSubcategory { Resolves = resolves };
        }
    }
}