namespace CRM.Criteria.Feedback
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class LatestFeedbackCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public int Top { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey()
        {
                return "FeedbackSelTopFeedback";
        }

        public override bool IsValid()
        {
            return Top > 0;
        }
    }
}
