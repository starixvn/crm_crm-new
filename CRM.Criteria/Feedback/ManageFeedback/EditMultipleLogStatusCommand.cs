namespace CRM.Criteria.Feedback.ManageFeedback
{
    using CRM.Core.Models;

    public class EditMultipleLogStatusCommand : BaseNonQueryCommand
    {
        public string ListFeedbackId { get; set; }

        public int StatusId { get; set; }

        public string ReviewNote { get; set; }

        public int ?ReviewerId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_UpdMultipleReviewAndStatus";

        public override bool IsValid() => !string.IsNullOrEmpty(ListFeedbackId) && StatusId > 0;
    }
}
