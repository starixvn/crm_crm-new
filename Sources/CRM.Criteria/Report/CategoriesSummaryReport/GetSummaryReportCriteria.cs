namespace CRM.Criteria.Report.CategoriesSummaryReport;

using Fanex.Data;

public class GetSummaryReportCriteria : BaseSitePermissionCriteria
{
    private readonly int minYear = 2011;

    public int Year { get; set; }

    public int SiteType { get; set; }

    public int TimeSpan { get; set; }

    [SpParam(Ignored = true)]
    public string Categories { get; set; }

    public override string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatisticsSummary";

    public override bool IsValid() => Year >= minYear;
}