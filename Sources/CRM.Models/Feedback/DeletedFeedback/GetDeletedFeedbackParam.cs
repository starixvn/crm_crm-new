namespace CRM.Models.DeletedFeedback
{
    using System;
    public class GetDeletedFeedbackParam
    {
        public string Username { get; set; }

        public bool? IsGuest { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int? MainCategoryId { get; set; }

        public int? SubCategoryId { get; set; }

        public int? CommunicationId { get; set; }

        public int? ResponseId { get; set; }

        public bool? IsReviewed { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }
    }
}
