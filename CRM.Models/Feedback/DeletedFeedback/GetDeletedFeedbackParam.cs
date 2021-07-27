namespace CRM.Models.DeletedFeedback
{
    using System;
    public class GetDeletedFeedbackParam
    {
        public string Username { get; set; }

        public int IsGuest { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string MainCategoryId { get; set; }

        public int SubCategoryId { get; set; }

        public int CommunicationId { get; set; }

        public int ResponseId { get; set; }

        public int IsReviewed { get; set; }
    }
}
