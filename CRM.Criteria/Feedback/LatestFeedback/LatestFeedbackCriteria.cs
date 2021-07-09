namespace CRM.Criteria.Feedback.LatestFeedback
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class LatestFeedbackCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public int Top { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelTop";

        public override bool IsValid() => Top > 0;
    }
}