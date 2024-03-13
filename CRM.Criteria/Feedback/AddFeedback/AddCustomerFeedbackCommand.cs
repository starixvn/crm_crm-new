using Fanex.Data;

namespace CRM.Criteria.Feedback.AddFeedback
{
    public class AddCustomerFeedbackCommand : AddGuestFeedbackCommand
    {
        public int CustId { get; set; }

        [SpParam(SqlParamName = "RefCode2")]
        public string RefCode { get; set; }
        [SpParam(SqlParamName = "BettingCode")]
        public string SecretCode { get; set; }
        public bool IsCommunicationLog { get; set; }
        public bool IsHeadline { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_NewManualFeedback_FeedbackIns";
        }

        public override bool IsValid() => true;
    }
}
