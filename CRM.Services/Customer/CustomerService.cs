namespace CRM.Services.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;

    public interface ICustomerService
    {
        Task<CustomerSession> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);

        Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command);

        Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria);

        Task<CustomerSession> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria);
    }

    public class CustomerService : ICustomerService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;

        public CustomerService(IBaseService baseService, ISettingService settingService)
        {
            this.baseService = baseService;
            this.settingService = settingService;
        }

        public async Task<CustomerSession> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
        {
            var (customers, languageIds) = await baseService.FetchMultipleAsync<CustomerSession, int>(criteria);
            CustomerSession customerInfo = null;
            if (customers.Any())
            {
                customerInfo = customers.FirstOrDefault();
                customerInfo.Role.Id = customerInfo.RoleId;
                customerInfo.Role.Name = RoleSettingService.GetRoleName(customerInfo.RoleId);
                customerInfo.Languages = languageIds.ToList();
                customerInfo.LanguageIds = string.Join(",", languageIds);

                var site = await settingService.GetSiteByIdAsync(customerInfo.SiteId);
                customerInfo.SiteSetting = new BaseSetting
                {
                    Id = site.Id,
                    Name = site.Name
                };

                if (!criteria.IsGuest)
                {
                    customerInfo.UplineInfo = await GetUplineInfoAsync(customerInfo.CustId);
                }
            }

            return customerInfo;
        }

        protected internal virtual async Task<IEnumerable<CustomerSession>> GetUplineInfoAsync(int custId)
        {
            var criteria = new GetUplineInfoOfUserCriteria { CustId = custId };
            var uplineInfos = new List<CustomerSession>();
            var customers = await baseService.GetDataAsync<CustomerSession>(criteria);
            foreach (var item in customers)
            {
                if (criteria.CustId == item.CustId || item.RoleId == RoleIdConstants.Headline)
                {
                    continue;
                }

                item.Role.Id = item.RoleId;
                item.Role.Name = RoleSettingService.GetRoleName(item.RoleId);
                uplineInfos.Add(item);
            }

            var headline = customers.Where(i => i.Role.Id == RoleIdConstants.Headline)
                .Select(i =>
                {
                    i.Role.Name = RoleSettingService.GetRoleName(i.Role.Id);
                    return i;
                }).FirstOrDefault() ?? GetUnAssignedCustomerInfo();

            uplineInfos.Insert(0, headline);

            return uplineInfos;
        }

        public async Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria)
        {
            return await baseService.GetDataAsync<string>(criteria);
        }

        private CustomerSession GetUnAssignedCustomerInfo()
        {
            return new CustomerSession
            {
                Username = "Unassigned",
                IsActive = false,
                IsClosed = false,
                IsSuspended = false,
                Role = new BaseSetting
                {
                    Id = RoleIdConstants.Headline,
                    Name = RoleSettingService.GetRoleName(RoleIdConstants.Headline)
                }
            };
        }

        public async Task<CustomerSession> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria)
        {
            var (customer, languages) = await baseService.FetchMultipleAsync<CustomerSession, CustomerLanguageInfo>(criteria);
            var listLanguages = new List<int>();
            CustomerSession customerInfo = null;
            if (customer.Any())
            {
                customerInfo = customer.FirstOrDefault();

                var site = await settingService.GetSiteByIdAsync(customerInfo.SiteId);
                foreach (var item in languages)
                {
                    listLanguages.Add(item.LanguageId);
                }
                customerInfo.Languages = listLanguages;
                customerInfo.LanguageIds = string.Join(",", listLanguages);
                customerInfo.SiteSetting = new BaseSetting
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