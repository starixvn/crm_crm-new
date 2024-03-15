namespace CRM.Services.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using Microsoft.Extensions.Configuration;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    public interface ICustomerService
    {
        Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);

        Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command);

        Task<CommandResult> UpdateCustomerSuggestionAsync(UpdateCustomerSuggestionCriteria criteria);

        Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria);

        Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria);

        Task<IEnumerable<UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria);

        Task<CustomerPermissionInfo> GetSiteTypeByCustIdAsync(int custId);

        Task<bool> HasHostPermissionOnCustIdAsync(int custId);
    }

    public class CustomerService : ICustomerService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IPermissionService permissionService;
        private readonly string Environment;
        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public CustomerService(IBaseService baseService, ISettingService settingService, IPermissionService permissionService, IConfiguration configuration)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.permissionService = permissionService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
        {
            var (customers, languageIds) = await baseService.FetchMultipleAsync<CustomerInfoDetails, int>(criteria);
            CustomerInfoDetails customerInfo = null;
            if (customers.Any())
            {
                customerInfo = customers.First();
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
            => await baseService.ExecuteNonQueryAsync(command);

        public async Task<CommandResult> UpdateCustomerSuggestionAsync(UpdateCustomerSuggestionCriteria criteria)
            => await baseService.ExecuteNonQueryAsync(criteria);

        public async Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria)
            => await baseService.GetDataAsync<string>(criteria);

        private static CustomerInfoDetails GetUnAssignedCustomerInfo()
        => new CustomerInfoDetails
        {
            Username = "Unassigned",
            IsActive = false,
            IsClosed = false,
            IsSuspended = false,
            RoleId = RoleIdConstants.Headline,
            RoleName = RoleSettingService.GetRoleName(RoleIdConstants.Headline)
        };

        public async Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria)
        {
            var (customer, languages) = await baseService.FetchMultipleAsync<CustomerInfoDetails, CustomerLanguageInfo>(criteria);
            var listLanguages = new List<int>();
            CustomerInfoDetails customerInfo = null;
            if (customer.Any())
            {
                customerInfo = customer.First();

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

        public async Task<IEnumerable<UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria)
        {
            criteria.Environment = Environment;
            return await baseService.GetDataAsync<UserInfo>(criteria);
        }

        private async Task<bool> CheckDirectAccount(int customerId)
        {
            var criteria = new CheckDirectAccountCriteria
            {
                CustomerId = customerId
            };

            return await baseService.GetDataEntityAsync<bool>(criteria);
        }

        public async Task<CustomerPermissionInfo> GetSiteTypeByCustIdAsync(int custId)
        {
            var criteria = new GetSiteTypeByCustIdCriteria { CustId = custId };
            var custPermissionInfo = await baseService.GetDataEntityAsync<CustomerPermissionInfo>(criteria);

            if (criteria.ErrCode == 0)
            {
                return custPermissionInfo;
            }
            return null;
        }

        public async Task<bool> HasHostPermissionOnCustIdAsync(int custId)
        {
            bool isHostOnCustId = false;

            bool isReadCredit = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Read);
            bool isReadLicensee = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Read);
            bool isHostOnCustomerInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CustomerInfo, Policy.Host);

            if (custId < 0)
            {
                return isHostOnCustomerInfo;
            }

            var custPermissionInfo = await GetSiteTypeByCustIdAsync(custId);

            if (custPermissionInfo is not null && isHostOnCustomerInfo)
            {
                if (custPermissionInfo.CustomerType == SiteType.NA)
                {
                    isHostOnCustId = isReadCredit || isReadLicensee;
                }

                if (custPermissionInfo.CustomerType == SiteType.Licensee)
                {
                    isHostOnCustId = isReadLicensee;
                }

                if (custPermissionInfo.CustomerType == SiteType.Credit)
                {
                    bool isHostOnCreditSiteLabel = !string.IsNullOrWhiteSpace(custPermissionInfo.SitePermission) && await permissionService.IsHavingPermissionByPolicyAsync(custPermissionInfo.SitePermission);
                    isHostOnCustId = isHostOnCreditSiteLabel;
                }
            }
            return isHostOnCustId;
        }
    }
}