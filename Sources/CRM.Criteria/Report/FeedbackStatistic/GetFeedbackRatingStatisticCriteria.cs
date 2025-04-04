namespace CRM.Criteria.Report.FeedbackStatistic;

using Constants;
using Fanex.Data.Repository;

public class GetFeedbackRatingStatisticCriteria : GetFeedbackStaticBaseModel, ICriteria
{
    public string GetSettingKey() => "Acc_CRM_Rpt_RatingFeedbackStatistic";

    public bool IsValid() => FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
}