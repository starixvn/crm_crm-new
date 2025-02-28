namespace CRM.Models.Report.DynamicReport;

using System.Collections.Generic;
using CRM.Models.Common;
using CRM.Models.CommunicationLogs;

public class DynamicReportInfo : CommunicationLog
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string ShortName { get; set; }

    public int ReportTypeId { get; set; }
    public string HandledBy { get; set; }
    public string ReviewedBy { get; set; }

    public PeriodRange PeriodRange { get; set; }

    public List<DynamicReportInfo> ChildReports { get; set; }

    public int TotalChildReports { get; set; }

    public int StartChildIndex { get; set; }

    public DynamicReportInfo ChartInfo { get; set; }

    public IList<SettingItem> DynamicSettings { get; set; } = new List<SettingItem>();
}