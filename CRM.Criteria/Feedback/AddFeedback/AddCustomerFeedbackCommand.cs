namespace CRM.Criteria.Feedback.AddFeedback
{
    public class AddCustomerFeedbackCommand : AddGuestFeedbackCommand
    {
        public int CustId { get; set; }
        public bool IsOverWrite { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_CustomerFeedbackIns";
        }

        public override bool IsValid() => true;
    }
}
