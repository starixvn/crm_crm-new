namespace CRM.Criteria.Feedback.DeletedFeedback
{
    using Fanex.Data.Repository;
    using System;
    using System.Collections;

    public class DeletedFeedbackCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public int IsGuest { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string MainCategoryId { get; set; }

        public int SubCategoryId { get; set; }

        public int CommunicationId { get; set; }

        public int ResponseId { get; set; }

        public int IsReviewed { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_FeedbackGetDeleted";
        }

        public override bool IsValid()
        {
            return FromDate <= ToDate && (ToDate - FromDate).Days <= 365;
        }

    }
}
