namespace CRM.Services.Report
{
    using CRM.Core.Services;
    using CRM.Criteria.Report.DirectCustomerReport;
    using CRM.Models.Report.DirectCustomerReport;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IDirectReportService
    {
        Task<DirectCustomerReportInfo> GetReport(DirectCustomerReportCriteria criteria);
    }
    public class DirectReportService : IDirectReportService
    {
        private readonly IBaseService baseService;

        public DirectReportService(IBaseService baseService)
        {
            this.baseService = baseService;
        }
        public async Task<DirectCustomerReportInfo> GetReport(DirectCustomerReportCriteria criteria)
        {
            var rawData = await baseService.GetDataAsync<DirectCustomerInfo>(criteria);
            IList<DirectCustomerInfo> customerList = rawData.ToList();

            return new DirectCustomerReportInfo {
                CustomerList = customerList,
                TotalCustomer = criteria.TotalRows
            };
        }
    }
}
