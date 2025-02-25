namespace CRM.Criteria.Report.FeedbackStatistic
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;

    public class GetFeedbackStatisticCriteria : BaseSitePermisionCriteria
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string FromDuration { get; set; }

        public string ToDuration { get; set; }

        public int Type { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }

        [SpParam(Ignored = true)]
        public int PageSize { get; set; }

        public override string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatistics";

        public override bool IsValid() => FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
    }
}