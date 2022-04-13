using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Models.Report.DirectCustomerReport
{
    public class DirectCustomerReportInfo
    {
        public IList<DirectCustomerInfo> CustomerList { get; set; }

        public int TotalCustomer { get; set; }
    }
}
