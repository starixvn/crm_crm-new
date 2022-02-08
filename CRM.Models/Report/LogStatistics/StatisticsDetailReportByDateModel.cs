namespace CRM.Models.Report.LogStatistics
{
    using System.Collections.Generic;

    public class StatisticsDetailReportByDateModel : BaseModel
    {
        public IEnumerable<StatisticsDetailbyDateModel> ChildReports { get; set; } = new List<StatisticsDetailbyDateModel>();
        public string ExcelFileName { get; set; }
    }
}
