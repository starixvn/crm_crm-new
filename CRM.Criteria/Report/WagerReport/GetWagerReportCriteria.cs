using CRM.Core.Models;
using Fanex.Data;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Criteria.Report.WagerReport
{
    public class GetWagerReportCriteria : CriteriaBase
    {
        public int Year { get; set; }
        public int TimeSpan { get; set; }
        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_FeedbackStatisticsWagers";
        }

        public override bool IsValid()
        {
            return Year > 0;
        }
    }
}
