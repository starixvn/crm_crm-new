namespace CRM.Criteria.Report.FeedbackStatistic;

using System;
using Constants;
using Fanex.Data;

public class GetFeedbackStatisticDetailCriteria : BaseSitePermisionCriteria
{
    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public string FromDuration { get; set; }

    public string ToDuration { get; set; }

    public int Type { get; set; }

    public int MainCategoryId { get; set; }

    public int SubCategoryId { get; set; }

    public int ValueId { get; set; }

    [SpParam(Ignored = true)]
    public int PageIndex { get; set; }

    [SpParam(Ignored = true)]
    public int PageSize { get; set; }

    public override string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatisticDetails";

    public override bool IsValid() => FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
}