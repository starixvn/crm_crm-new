namespace CRM.Models.Report.DirectCustomerReport
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    public class DirectCustomerReportInfo
    {
        public IList<DirectCustomerInfo> CustomerList { get; set; }

        public int TotalCustomer { get; set; }
    }
}
