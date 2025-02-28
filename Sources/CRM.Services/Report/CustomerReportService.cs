namespace CRM.Services.Report;

using System.Threading.Tasks;
using CRM.Criteria.Report.CustomerReport;
using CRM.Models.Report.CustomerReport;

public interface ICustomerReportService
{
    Task<CustomerReportInfo> GetCustomerReportAsync(GetCustomerReportParam param);
}

public class CustomerReportService(IBaseService baseService) : ICustomerReportService
{
    public async Task<CustomerReportInfo> GetCustomerReportAsync(GetCustomerReportParam param)
    {
        var criteria = new GetCustomerReportCriteria
        {
            Username = param.Username,
            Headline = param.Headline,
            Vip = param.VipId,
            LanguageId = param.LanguageIds,
            SiteId = param.SiteIds,
            RoleId = param.PositionIds,
            ExcludeIgnoredAcc = param.ExcludeIgnoredAccounts,
            PageIndex = param.PageIndex,
            PageSize = param.PageSize
        };

        var customerInfo = await baseService.GetDataAsync<CustomerInfo>(criteria);

        var customerReportInfo = new CustomerReportInfo
        {
            CustomerList = customerInfo,
            TotalCustomer = criteria.TotalRows
        };
            
        return customerReportInfo;
    }
}