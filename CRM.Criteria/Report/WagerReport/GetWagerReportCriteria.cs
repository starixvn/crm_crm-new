using CRM.Core.Models;
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
            return "Report_WagerReport_GetReport";
        }

        public override bool IsValid()
        {
            return Year > 0;
        }
    }
}
