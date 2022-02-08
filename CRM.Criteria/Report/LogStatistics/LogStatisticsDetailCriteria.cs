namespace CRM.Criteria.Report.LogStatistics
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class LogStatisticsDetailCriteria : CriteriaBase
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public short SiteType { get; set; }

        public string ProductId { get; set; }

        public string MainCategoryId { get; set; }

        public string CommunicationId { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }

        [SpParam(Ignored = true)]
        public bool IsGetFullReport { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_DailyStatisticsDetail";
        }

        public override bool IsValid()
        {
            return FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.LogStatisticDayValid;
        }
    }
}
