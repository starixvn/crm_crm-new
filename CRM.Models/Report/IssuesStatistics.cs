namespace CRM.Models.Report
{
    using System;

    public class IssuesStatistics
    {
        public DateTime FeedbackDate { get; set; }

        public int CountryId { get; set; }

        public string CountryName { get; set; }

        public int NoOfIssues { get; set; }
    }
}
