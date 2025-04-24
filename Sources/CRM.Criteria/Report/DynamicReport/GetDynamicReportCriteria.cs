namespace CRM.Criteria.Report.DynamicReport;

using System;
using Constants;
using Fanex.Data;

public class GetDynamicReportCriteria : BaseSitePermissionCriteria
{
    [SpParam(Ignored = true)]
    public int ReportType { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int ProductId { get; set; }

    public int SubProductId { get; set; }

    public int SiteId { get; set; }

    public int StatusId { get; set; }

    public int ResponseId { get; set; }

    public int RoleId { get; set; }

    [SpParam(SqlParamName = "communicationid")]
    public int CommunicationToolId { get; set; }

    public int MainCategoryId { get; set; }

    public int SubCategoryId { get; set; }

    [SpParam(SqlParamName = "handledby")]
    public string Handler { get; set; }

    [SpParam(SqlParamName = "reviewedby")]
    public string Reviewer { get; set; }

    [SpParam(SqlParamName = "extension")]
    public int ExtensionId { get; set; }

    public string Subject { get; set; }

    [SpParam(Ignored = true)]
    public int PageIndex { get; set; }

    [SpParam(Ignored = true)]
    public int PageSize { get; set; }

    [SpParam(Ignored = true)]
    public bool IsGetFullReport { get; set; }

    public override string GetSettingKey() => "Acc_CRM_Rpt_DynamicFeedback";

    public override bool IsValid() => FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear + Constants.DaysOfWeek;
}