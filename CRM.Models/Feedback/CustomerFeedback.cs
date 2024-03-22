namespace CRM.Models.Feedback
{
    using System;
    using System.Collections.Generic;
    using CRM.Models.Customer;
    using LatestFeedback;

    public class CustomerFeedback : CustomerInfoDetails
    {
        public int FeedbackId { get; set; }

        public DateTime FeedbackDate { get; set; }
        public DateTime ResolutionDate { get; set; }
        public DateTime SolveDate { get; set; }

        public BaseModel Extension { get; set; }
        public BaseModel Communication { get; set; }
        public BaseModel Category { get; set; }
        public BaseModel SubCategory { get; set; }
        public BaseModel Product { get; set; }
        public BaseModel SubProduct { get; set; }
        public BaseModel BetType { get; set; }

        public int StatusId { get; set; }
        public int ResponseId { get; set; }
        public int LanguageId { get; set; }
        public bool HasRelated { get; set; }

        public IEnumerable<RelatedCustomerPermission> RelatedCustomers { get; set; } = new List<RelatedCustomerPermission>();
        public IEnumerable<LatestFeedbackCommunicationTool> LatestFeedbackCommunicationTools { get; set; }

        public string Subject { get; set; }
        public string Description { get; set; }
        public string Solution { get; set; }
        public bool IsReviewed { get; set; }
        public string Review { get; set; }

        public int ReviewerId { get; set; }
        public string ReviewerName { get; set; }

        public int CreatorId { get; set; }
        public int UserId { get; set; }

        public string AutoField { get; set; }
        public int NoInquiries { get; set; }
        public bool IsCheckFeedbackIdIsNew { get; set; }

        public IList<FeedbackSettingRelation> Settings { get; set; } = new List<FeedbackSettingRelation>();
    }
}