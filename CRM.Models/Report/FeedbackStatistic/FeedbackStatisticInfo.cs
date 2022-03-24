namespace CRM.Models.Report.FeedbackStatistic
{
    using System.Collections.Generic;

    public class FeedbackStatisticInfo: BaseModel
    {
        public string Title { get; set; }

        public IList<BaseModel> Usernames { get; set; }

        public int TotalItems { get; set; }

        public IList<FeedbackCategory> FeedbackCategories { get; set; }

        public int[] GrandTotals { get; set; }
    }
}
