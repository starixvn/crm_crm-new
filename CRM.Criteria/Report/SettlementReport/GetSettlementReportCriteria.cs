namespace CRM.Criteria.Report.SettlementReport
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetSettlementReportCriteria : CriteriaBase
    {
        private readonly int minYear = 2011;

        public int Year { get; set; }

        public int TimeSpan { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }

        [SpParam(Ignored = true)]
        public int PageSize { get; set; }

        [SpParam(Ignored = true)]
        public bool IsGetFullReport { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_FeedbackStatisticsSettlement";
        }

        public override bool IsValid() => Year >= minYear;
    }
}