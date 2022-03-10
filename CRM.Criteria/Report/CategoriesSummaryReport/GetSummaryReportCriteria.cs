using Fanex.Data;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Criteria.Report.CategoriesSummaryReport
{
    public class GetSummaryReportCriteria : CriteriaBase
    {
        private readonly int minYear = 2011;

        public int Year { get; set; }

        public int SiteType { get; set; }

        public int TimeSpan { get; set; }

        [SpParam(Ignored = true)]
        public string Categories { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_FeedbackStatisticsSummary";
        }

        public override bool IsValid() => Year >= minYear;

    }
}
