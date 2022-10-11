using Fanex.Data;

namespace CRM.Criteria.Feedback.AddFeedback
{
    public class AddCustomerFeedbackCommand : AddGuestFeedbackCommand
    {
        public int CustId { get; set; }
        public bool IsOverWrite { get; set; }

        [SpParam(SqlParamName = "RefCode2")]
        public string RefCode { get; set; }
        [SpParam(SqlParamName = "BettingCode")]
        public string SecretCode { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_CustomerFeedbackIns";
        }

        public override bool IsValid() => true;
    }
}
