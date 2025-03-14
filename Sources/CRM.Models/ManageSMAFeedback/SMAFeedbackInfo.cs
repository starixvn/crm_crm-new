using System;

namespace CRM.Models.ManageSmaFeedback
{
    public class SmaFeedbackInfo
    {
        public int FeedbackId { get; set; }

        public DateTime CreateTime { get; set; }

        public string Username { get; set; }

        public string Level { get; set; }

        public string Site { get; set; }

        public string Function { get; set; }

        public string ReviewStatus { get; set; }

        public string Comment { get; set; }

        public string DiscussionSolution { get; set; }
    }
}
