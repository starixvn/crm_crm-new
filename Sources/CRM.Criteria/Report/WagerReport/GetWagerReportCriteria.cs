namespace CRM.Criteria.Report.WagerReport
{
    using Fanex.Data.Repository;

    public class GetWagerReportCriteria : CriteriaBase
    {
        private readonly int minYear = 2011;
        public int Year { get; set; }
        public int TimeSpan { get; set; }
        public override string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatisticsWagers";
        public override bool IsValid() => Year >= minYear;
    }
}
