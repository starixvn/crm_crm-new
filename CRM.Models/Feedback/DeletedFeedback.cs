namespace CRM.Models.Feedback
{
    using CRM.Core.Models.Feedback;

    public class DeletedFeedback : FeedbackDetail
    {
        public string Description { get; set; }

        public string Solution { get; set; }

        public string AutoField { get; set; }
    }
}
