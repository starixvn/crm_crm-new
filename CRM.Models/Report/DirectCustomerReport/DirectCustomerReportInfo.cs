namespace CRM.Models.Report.DirectCustomerReport
{
    using System.Collections.Generic;
    public class DirectCustomerReportInfo
    {
        public IEnumerable<DirectCustomerInfo> CustomerList { get; set; }

        public int TotalCustomer { get; set; }
    }
}
