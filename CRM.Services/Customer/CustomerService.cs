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
    using Microsoft.Extensions.Configuration;

    public interface ICustomerService
    {
        Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);

        Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command);

        Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria);

        Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria);

        Task<IEnumerable<Models.Customer.UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria);
    }

    public class CustomerService : ICustomerService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly string Environment;
        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public CustomerService(IBaseService baseService, ISettingService settingService, IConfiguration configuration)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
        {
            var (customers, languageIds) = await baseService.FetchMultipleAsync<CustomerInfoDetails, int>(criteria);
            CustomerInfoDetails customerInfo = null;
            if (customers.Any())
            {
                customerInfo = customers.FirstOrDefault();
                customerInfo.RoleName = RoleSettingService.GetRoleName(customerInfo.RoleId);
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

        protected internal virtual async Task<IEnumerable<CustomerInfoDetails>> GetUplineInfoAsync(int custId)
        {
            var criteria = new GetUplineInfoOfUserCriteria { CustId = custId };
            var uplineInfos = new List<CustomerInfoDetails>();
            var customers = (await baseService.GetDataAsync<CustomerInfoDetails>(criteria)).OrderByDescending(x => x.RoleId);
            foreach (var item in customers)
            {
                if (criteria.CustId == item.CustId || item.RoleId == RoleIdConstants.Headline)
                {
                    continue;
                }

                item.RoleName = RoleSettingService.GetRoleName(item.RoleId);
                uplineInfos.Add(item);
            }

            var headline = customers.Where(i => i.RoleId == RoleIdConstants.Headline)
                .Select(i =>
                {
                    i.RoleName = RoleSettingService.GetRoleName(i.RoleId);
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

        private CustomerInfoDetails GetUnAssignedCustomerInfo()
        {
            return new CustomerInfoDetails
            {
                Username = "Unassigned",
                IsActive = false,
                IsClosed = false,
                IsSuspended = false,
                RoleId = RoleIdConstants.Headline,
                RoleName = RoleSettingService.GetRoleName(RoleIdConstants.Headline)
            };
        }

        public async Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria)
        {
            var (customer, languages) = await baseService.FetchMultipleAsync<CustomerInfoDetails, CustomerLanguageInfo>(criteria);
            var listLanguages = new List<int>();
            CustomerInfoDetails customerInfo = null;
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

        public async Task<IEnumerable<Models.Customer.UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria)
        {
            criteria.Environment = Environment;
            return await baseService.GetDataAsync<Models.Customer.UserInfo>(criteria);
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