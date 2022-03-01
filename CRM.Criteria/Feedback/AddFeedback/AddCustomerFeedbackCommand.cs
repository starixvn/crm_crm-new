namespace CRM.Criteria.Feedback.AddFeedback
{
    public class AddCustomerFeedbackCommand : AddGuestFeedbackCommand
    {
        public bool OverrideCRMInfo { get; set; }
        public override string GetSettingKey()
        {
            return "CustomerFeedbackIns";
        }

        public override bool IsValid() => true;
    }
}
