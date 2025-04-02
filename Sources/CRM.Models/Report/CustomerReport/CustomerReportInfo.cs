namespace CRM.Models.Report.CustomerReport;

using System.Collections.Generic;

public class CustomerReportInfo
{
    public IEnumerable<CustomerInfo> CustomerList { get; set; }

    public int TotalCustomer { get; set; }
}