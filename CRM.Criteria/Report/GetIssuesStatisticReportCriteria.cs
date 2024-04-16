namespace CRM.Criteria.Report
{
    using System;
    using Fanex.Data;

    public class GetIssuesStatisticReportCriteria : BaseSitePermisionCriteria
    {
        [SpParam(Ignored = true)]
        public int ReportType { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int MainCategoryId { get; set; }

        public int SubCategoryId { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }

        [SpParam(Ignored = true)]
        public int PageSize { get; set; }

        [SpParam(Ignored = true)]
        public bool IsGetFullReport { get; set; }

        public override string GetSettingKey() => "Acc_CRM_Rpt_FeedbackStatisticsPeriod";

        public override bool IsValid() => true;
    }
}