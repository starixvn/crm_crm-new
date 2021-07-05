namespace CRM.Criteria.Feedback
{
    using CRM.Core.Models;

    public class EditNoInquiriesCommand : BaseNonQueryCommand
    {
        public int FeedbackID { get; set; }

        public int? NoInquiries { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_CustomerFeedbackQuickUpd";
        }

        public override bool IsValid()
        {
            return FeedbackID > 0;
        }
    }
}
