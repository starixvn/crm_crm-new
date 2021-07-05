namespace CRM.Criteria.Feedback
{
    using Fanex.Data.Repository;

    public class GetNoInquiriesCriteria : CriteriaBase
    {
        public int FeedbackID { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_FeedbackQuickSel";
        }

        public override bool IsValid()
        {
            return FeedbackID > 0;
        }
    }
}
