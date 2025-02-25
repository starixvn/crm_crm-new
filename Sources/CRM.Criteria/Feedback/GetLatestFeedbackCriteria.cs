namespace CRM.Criteria.Feedback
{
    public class GetLatestFeedbackCriteria : BaseSitePermisionCriteria
    {
        public int Top { get; set; }

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelTop";

        public override bool IsValid() => Top > 0;
    }
}