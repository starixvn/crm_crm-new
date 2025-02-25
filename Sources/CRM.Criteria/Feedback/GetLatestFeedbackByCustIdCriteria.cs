namespace CRM.Criteria.Feedback
{
    public class GetLatestFeedbackByCustIdCriteria : BaseSitePermisionCriteria
    {
        public int Top { get; set; }
        public int CustID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelTopByCustId";

        public override bool IsValid() => Top > 0 && CustID != 0;
    }
}