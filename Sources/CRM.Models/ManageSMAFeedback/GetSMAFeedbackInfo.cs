using System;

namespace CRM.Models.ManageSmaFeedback
{
    public class GetSmaFeedbackInfo
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ReviewStatus { get; set; }

        public string Username { get; set; }

        public string SitePermission { get; set; }

        public short LicenseeType { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }
    }
}
