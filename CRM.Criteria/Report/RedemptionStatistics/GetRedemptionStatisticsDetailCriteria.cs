namespace CRM.Criteria.Report.RedemptionStatistics
{
    using CRM.Core.Constants;
    using Fanex.Data;

    public class GetRedemptionStatisticsDetailCriteria : GetRedemptionStatisticsCriteria
    {
        [SpParam(Ignored = true)]
        public override int ReportBy { get; set; }

        public int PageIndex { get; set; }

        public int ItemsPerPage { get; set; }

        public int TotalRows { get; set; }
        public override string GetSettingKey()
        {
            return "Acc_Crm_Rpt_RedemptionStatisticsDetail";
        }

        public override bool IsValid()
        {
            return FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
        }
    }
}
