namespace CRM.Services.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Customer;

    public interface ICustomerService
    {
        Task<CustomerInfo> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);

        Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command);

        Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria);
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

        public async Task<CustomerInfo> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
        {
            var (customers, languageIds) = await baseService.FetchMultipleAsync<CustomerInfo, int>(criteria);
            CustomerInfo customerInfo = null;
            if (customers.Any())
            {
                customerInfo = customers.FirstOrDefault();
                customerInfo.Role.Id = customerInfo.RoleID;
                customerInfo.Role.Name = RoleSettingService.GetRoleName(customerInfo.RoleID);
                customerInfo.Languages = languageIds.ToList();
                customerInfo.LanguageID = string.Join(",", languageIds);
                var siteSetting = await settingService.GetSettingById(new GetSettingByIdCriteria
                {
                    SettingId = customerInfo.SiteID
                });
                customerInfo.SiteSetting.Name = siteSetting.Name;
                customerInfo.SiteSetting.Id = customerInfo.SiteID;

                if (!criteria.IsGuest)
                {
                    customerInfo.UplineInfo = await GetUplineInfoAsync(customerInfo.CustId);
                }
            }

            return customerInfo;
        }

        protected internal virtual async Task<IEnumerable<CustomerInfo>> GetUplineInfoAsync(int custId)
        {
            var criteria = new GetUplineInfoOfUserCriteria { CustId = custId };
            var uplineInfos = new List<CustomerInfo>();
            var customers = await baseService.GetDataAsync<CustomerInfo>(criteria);
            foreach (var item in customers)
            {
                if (criteria.CustId == item.CustId || item.RoleID == RoleIdConstants.Headline)
                {
                    continue;
                }

                item.Role.Id = item.RoleID;
                item.Role.Name = RoleSettingService.GetRoleName(item.RoleID);
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

        private CustomerInfo GetUnAssignedCustomerInfo()
        {
            return new CustomerInfo
            {
                Username = "Unassigned",
                IsActive = false,
                IsClosed = false,
                IsSuspended = false,
                Role = new BaseModel
                {
                    Id = RoleIdConstants.Headline,
                    Name = RoleSettingService.GetRoleName(RoleIdConstants.Headline)
                }
            };
        }
    }
}