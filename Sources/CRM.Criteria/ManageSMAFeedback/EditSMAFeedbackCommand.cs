using CRM.Models;

namespace CRM.Criteria.ManageSMAFeedback
{
    public class EditSmaFeedbackCommand : BaseNonQueryCommand
    {
        public int FeedbackId { get; set; }

        public string ReviewStatus { get; set; }

        public string DiscussionSolution { get; set; }

        public override string GetSettingKey() => "";

        public override bool IsValid() => true;
    }
}
