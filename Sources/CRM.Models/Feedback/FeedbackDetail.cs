namespace CRM.Models.Feedback
{
    using System;
    using System.Collections.Generic;

    public class FeedbackDetail
    {
        public int FeedbackId { get; set; }

        public string Username { get; set; }

        public string Creator { get; set; }
        public string CreatorName { get; set; }

        public DateTime FeedbackDate { get; set; }

        public DateTime ResolutionDate { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime SolveDate { get; set; }

        public int MainCategoryId { get; set; }

        public string MainCategory { get; set; }

        public int SubCategoryId { get; set; }

        public string SubCategory { get; set; }

        public int StatusId { get; set; }

        public string Status { get; set; }

        public bool IsReviewed { get; set; }

        public string ReviewerName { get; set; }

        public bool IsRelated { get; set; }

        public string Subject { get; set; }

        public string RelatedCustomer { get; set; } = string.Empty;

        public bool IsChecked { get; set; }

        public IList<FeedbackSettingRelation> Settings { get; set; } = new List<FeedbackSettingRelation>();

        public string DurationTime { get; set; }
    }
}