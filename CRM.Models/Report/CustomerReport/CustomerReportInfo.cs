namespace CRM.Models.Report.CustomerReport
{
    using System.Collections.Generic;
    using CRM.Models.Customer;

    public class CustomerReportInfo
    {
        public IEnumerable<CustomerInfo> CustomerList { get; set; }

        public int TotalCustomer { get; set; }
    }
}
