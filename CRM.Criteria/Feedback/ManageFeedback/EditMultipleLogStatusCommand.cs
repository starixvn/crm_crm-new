namespace CRM.Criteria.Feedback.ManageFeedback
{
    using CRM.Core.Models;

    public class EditMultipleLogStatusCommand : BaseNonQueryCommand
    {
        public string ListFeedbackId { get; set; }

        public int StatusId { get; set; }

        public string ReviewNote { get; set; }

        public int? ReviewerId { get; set; }

        public bool IsReviewed { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; } = string.Empty;

        public override string GetSettingKey() => "Acc_CRM_UpdMultipleReviewAndStatus";

        public override bool IsValid() => !string.IsNullOrEmpty(ListFeedbackId) && StatusId > 0;
    }
}