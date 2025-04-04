namespace CRM.Criteria.Report.LogStatistics;

using System;

public class LogStatisticsCriteria : BaseSitePermissionCriteria
{
    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int ProductType { get; set; }

    public int CategoryType { get; set; }

    public short SiteType { get; set; }

    public string ProductId { get; set; }

    public string MainCategoryId { get; set; }

    public string CommunicationId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_Rpt_DailyStatistics";

    public override bool IsValid()
    {
        return ProductId != string.Empty &&
               MainCategoryId != string.Empty &&
               CommunicationId != string.Empty;
    }
}