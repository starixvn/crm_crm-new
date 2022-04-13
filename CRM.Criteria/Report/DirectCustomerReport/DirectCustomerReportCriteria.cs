using Fanex.Data;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Criteria.Report.DirectCustomerReport
{
    public class DirectCustomerReportCriteria : CriteriaBase
    {
        public string Headline { get; set; }

        public string Username { get; set; }

        public bool ExcludeIgnoredAcc { get; set; }

        public int TotalRows { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_Crm_Rpt_DirectCustomerReport";
        }

        public override bool IsValid() => true;
    }
}
