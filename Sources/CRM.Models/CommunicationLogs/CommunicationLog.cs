namespace CRM.Models.CommunicationLogs
{
    using System;
    using System.Collections.Generic;
    using CRM.Models.Common;
    using CRM.Models.Customer;
    using CRM.Models.Feedback;

    public class CommunicationLog
    {
        public IList<FeedbackSettingRelation> Settings { get; set; } = new List<FeedbackSettingRelation>();

        public IList<SettingItem> CommunicationSettings { get; set; } = new List<SettingItem>();

        public int FeedbackId { get; set; }

        public string Duration { get; set; }

        public string Status { get; set; }

        public DateTime FeedbackDate { get; set; }

        public int CustId { get; set; }

        public string UserName { get; set; }

        public int StatusId { get; set; }

        public int RoleId { get; set; }

        public int CountryId { get; set; }

        public int LanguageId { get; set; }

        public int SiteId { get; set; }

        public int ResponseId { get; set; }

        public string Subject { get; set; }

        public DateTime ResolutionDate { get; set; }

        public string Handler { get; set; }

        public string Reviewer { get; set; }

        public DateTime SolveDate { get; set; }

        public int ProvinceId { get; set; }

        public int LicenseeType { get; set; }

        public IEnumerable<RelatedCustomerPermission> RelatedCustomers { get; set; } = new List<RelatedCustomerPermission>();

        public string Remark { get; set; }

        public string Solution { get; set; }

        public string Review { get; set; }

        public bool IsReviewed { get; set; }

        public string AutoField { get; set; }

        public string Description { get; set; }

        public int NoInquiries { get; set; }

        public Site SiteSetting { get; set; } = new Site();

        public string DurationTime => ResolutionDate != DateTimeOffset.MinValue.DateTime ? GetResolvingTime() : string.Empty;

        private string GetResolvingTime()
        {
            var totalDays = ResolutionDate - FeedbackDate;
            return string.Format(
                "{0}:{1}:{2}:{3}",
                totalDays.Days,
                totalDays.Hours,
                totalDays.Minutes,
                totalDays.Seconds);
        }

        public int Rating { get; set; }
    }
}