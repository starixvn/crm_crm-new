namespace CRM.Criteria.Feedback.DeletedFeedback
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;
    using System;

    public class GetDeletedFeedbackCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public bool? IsGuest { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int? MainCategoryId { get; set; }

        public int? SubCategoryId { get; set; }

        public int? CommunicationId { get; set; }

        public int? ResponseId { get; set; }

        public bool? IsReviewed { get; set; }

        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_FeedbackGetDeleted";

        public override bool IsValid() => FromDate <= ToDate;
    }
}
