namespace CRM.Services.Redemption
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Redemption;
    using CRM.Models.Redemption;

    public interface IRedemptionService
    {
        Task<IEnumerable<CustomerLogInfo>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria);
    }

    public class RedemptionService : IRedemptionService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public RedemptionService(IBaseService baseService, ICommonService commonService)
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<IEnumerable<CustomerLogInfo>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria)
        {
            var customerInfos = await baseService.GetDataAsync<CustomerLogInfo>(criteria);
            foreach (var customerInfo in customerInfos)
            {
                customerInfo.ClaimTime = commonService.ConvertToClientDateTime(customerInfo.ClaimTime);
            }
           
            return customerInfos;
        }
    }
}