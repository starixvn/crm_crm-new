using System;

namespace CRM.Models.ManageSMAFeedback
{
    public class GetSMAFeedbackInfo
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string ReviewStatus { get; set; }

        public string Username { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }
    }
}
