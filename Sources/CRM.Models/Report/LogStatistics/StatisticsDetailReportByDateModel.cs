namespace CRM.Models.Report.LogStatistics;

using System.Collections.Generic;
using CRM.Models.Feedback.LatestFeedback;

public class StatisticsDetailReportByDateModel : BaseModel
{
    public IEnumerable<StatisticsDetailbyDateModel> ChildReports { get; set; } = new List<StatisticsDetailbyDateModel>();
    public IEnumerable<LatestFeedbackCommunicationTool> CommunicationTools { get; set; } = new List<LatestFeedbackCommunicationTool>();
    public string ExcelFileName { get; set; }
}