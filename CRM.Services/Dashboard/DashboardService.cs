namespace CRM.Services.Dashboard
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.DashBoard;

    public interface IDashboardService
    {
        Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria);
    }

    public class DashboardService : IDashboardService
    {
        private readonly IBaseService baseService;

        public DashboardService(
            IBaseService baseService
        )
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria)
        {
            return await baseService.GetDataAsync<string>(criteria);
        }
    }
}
