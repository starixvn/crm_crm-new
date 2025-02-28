namespace CRM.Criteria.Report.RedemptionStatistics;

using System;
using Fanex.Data.Repository;

public class GetRedemptionStatisticsCriteria : CriteriaBase
{
    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public string Subject { get; set; }

    public string CurrencyId { get; set; }

    public virtual int ReportBy { get; set; }

    public string StatusId { get; set; }

    public override string GetSettingKey() => "Acc_Crm_Rpt_RedemptionStatistics";

    public override bool IsValid() => true;
}