namespace CRM.Models.Report.DeletedFeedbackStatistic
{
    using System;
    using System.Collections.Generic;
    using CRM.Models.Feedback;

    public class DeletedFeedbackStatistic
    {
        public DateTime CreateDate { get; set; }

        public string Handler { get; set; }

        public string Deletor { get; set; }

        public int FeedbackId { get; set; }

        public string Subject { get; set; }

        public string MainCategory { get; set; }

        public string SubCategory { get; set; }

        public string Customer { get; set; }

        public string RelatedCustomer { get; set; }

        public List<FeedbackSettingRelation> Settings { get; set; } = new List<FeedbackSettingRelation>();
    }
}
