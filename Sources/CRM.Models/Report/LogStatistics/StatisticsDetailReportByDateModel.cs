namespace CRM.Models.Report.LogStatistics;

using System.Collections.Generic;
using CRM.Models.Feedback.LatestFeedback;

public class StatisticsDetailReportByDateModel : BaseModel
{
    public IEnumerable<StatisticsDetailByDateModel> ChildReports { get; set; } = new List<StatisticsDetailByDateModel>();
    public IEnumerable<LatestFeedbackCommunicationTool> CommunicationTools { get; set; } = new List<LatestFeedbackCommunicationTool>();
    public string ExcelFileName { get; set; }
}