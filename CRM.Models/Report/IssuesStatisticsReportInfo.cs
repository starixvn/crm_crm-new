using System.Collections.Generic;

namespace CRM.Models.Report
{
    public class IssuesStatisticsReportInfo
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string ShortName { get; set; }

        public int ReportTypeId { get; set; }

        public PeriodRange PeriodRange { get; set; }

        public bool HasData { get; set; }

        public Country CountryInfo { get; set; }

        public int NumberOfIssues { get; set; }

        public IList<IssuesStatisticsReportInfo> ChildReports { get; set; } = new List<IssuesStatisticsReportInfo>();

        public IssuesStatisticsReportInfo Total { get; set; }

        public int TotalChildReports { get; set; }
    }
}
