namespace CRM.Criteria.Feedback
{
    using Fanex.Data.Repository;

    public class GetNoOfInquiryByFeedbackIdCriteria : CriteriaBase
    {
        public int FeedbackId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_FeedbackQuickSel";

        public override bool IsValid() => FeedbackId > 0;
    }
}
