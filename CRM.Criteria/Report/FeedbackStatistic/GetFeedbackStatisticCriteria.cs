namespace CRM.Criteria.Report.FeedbackStatistic
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetFeedbackStatisticCriteria : CriteriaBase
    {
        public short UserRole { get; } = Constants.UserRole;
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string FromDuration { get; set; }

        public string ToDuration { get; set; }

        public int Type { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }

        [SpParam(Ignored = true)]
        public int PageSize { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_FeedbackStatistics";
        }

        public override bool IsValid() => true;
    }
}
