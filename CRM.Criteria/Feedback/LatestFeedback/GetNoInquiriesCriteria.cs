namespace CRM.Criteria.Feedback.LatestFeedback
{
    using Fanex.Data.Repository;

    public class GetNoInquiriesCriteria : CriteriaBase
    {
        public int FeedbackID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_FeedbackQuickSel";

        public override bool IsValid() => FeedbackID > 0;
    }
}
