namespace CRM.Criteria.Report.FeedbackStatistic;

using Constants;
using Fanex.Data.Repository;

public class GetFeedbackStatisticCriteria : GetFeedbackStaticBaseModel, ICriteria
{
    public string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatistics";

    public bool IsValid() => FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
}