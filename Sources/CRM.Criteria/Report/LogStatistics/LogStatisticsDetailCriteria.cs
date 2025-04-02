namespace CRM.Criteria.Report.LogStatistics;

using System;
using Fanex.Data;

public class LogStatisticsDetailCriteria : BaseSitePermisionCriteria
{
    private const int LogStatisticDayValid = 93;

    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
        public DateTime? FirstResponseTime { get; set; }
    public short SiteType { get; set; }
    public string ProductId { get; set; }
    public string MainCategoryId { get; set; }
    public string CommunicationId { get; set; }
    public int PageSize { get; set; }
    public int PageIndex { get; set; }
    public int TotalRows { get; set; }

    [SpParam(Ignored = true)]
    public bool IsGetFullReport { get; set; }

    public override string GetSettingKey() => "Acc_CRM_NewRpt_DailyStatisticsDetail";

    public override bool IsValid()
    {
        return FromDate <= ToDate && (ToDate - FromDate).Days <= LogStatisticDayValid;
    }
}