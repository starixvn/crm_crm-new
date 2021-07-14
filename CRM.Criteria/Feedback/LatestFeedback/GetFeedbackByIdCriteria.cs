namespace CRM.Criteria.Feedback.LatestFeedback
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetFeedbackByIdCriteria : CriteriaBase
    {
        public int FeedbackId { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelByID";

        public override bool IsValid() => FeedbackId > 0;
    }
}
