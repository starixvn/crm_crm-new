namespace CRM.Models.Report.LogStatistics
{
    using System.Collections.Generic;

    public class StatisticsDetailReportByDateModel
    {
        public IEnumerable<StatisticsDetailbyDateModel> ChildReports { get; set; } = new List<StatisticsDetailbyDateModel>();

        public int TotalChildReports { get; set; }

        public int StartChildIndex { get; set; }
    }
}
