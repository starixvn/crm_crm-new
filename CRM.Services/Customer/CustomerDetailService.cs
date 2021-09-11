namespace CRM.Services.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Common;
    using CRM.Models.Customer;

    public interface ICustomerDetailService
    {
        Task<CustomerInfo> GetCustomerInfoDetailByIdAsync(GetCustomerInfoDetailByIdCriteria criteria);
    }

    public class CustomerDetailService : ICustomerDetailService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;

        public CustomerDetailService(IBaseService baseService, ISettingService settingService)
        {
            this.baseService = baseService;
            this.settingService = settingService;
        }

        public async Task<CustomerInfo> GetCustomerInfoDetailByIdAsync(GetCustomerInfoDetailByIdCriteria criteria)
        {
            var (customers, languages) = await baseService.FetchMultipleAsync<CustomerInfo, CustomerLanguageInfo>(criteria);
            CustomerInfo customerInfo = null;
            var listLanguages = new List<int>();
            if (customers.Any())
            {
                customerInfo = customers.FirstOrDefault();
                foreach (var item in languages)
                {
                    listLanguages.Add(item.LanguageId);
                }
                customerInfo.Languages = listLanguages;
                customerInfo.LanguageIds = string.Join(",", listLanguages);

                var site = await settingService.GetSiteByIdAsync(customerInfo.SiteId);
                customerInfo.SiteSetting = new Site
                {
                    Id = site.Id,
                    Name = site.Name
                };

                customerInfo.IsDirectAccount = await CheckDirectAccount(customerInfo.CustId);
            }

            return customerInfo;
        }

        private async Task<bool> CheckDirectAccount(int customerId)
        {
            var criteria = new CheckDirectAccountCriteria
            {
                CustomerId = customerId
            };

            return await baseService.GetDataEntityAsync<bool>(criteria);
        }
    }
}
