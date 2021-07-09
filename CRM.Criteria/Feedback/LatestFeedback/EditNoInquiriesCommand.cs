namespace CRM.Criteria.Feedback.LatestFeedback
{
    using CRM.Core.Models;

    public class EditNoInquiriesCommand : BaseNonQueryCommand
    {
        public int FeedbackID { get; set; }

        public int? NoInquiries { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerFeedbackQuickUpd";

        public override bool IsValid() => FeedbackID > 0;
    }
}
