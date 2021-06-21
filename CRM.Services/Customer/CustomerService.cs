namespace CRM.Services.Customer
{
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using CRM.Models.Customer;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;


    public interface ICustomerService
    {
        Task<CustomerInfo> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);
    }
    public class CustomerService : ICustomerService
    {
        private readonly IBaseService baseService;

        public CustomerService(
            IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<CustomerInfo> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
        {
            var customerInfo = await baseService.GetDataEntityAsync<CustomerInfo>(criteria);
            if (customerInfo != null)
            {
                customerInfo.Role.Id = customerInfo.RoleID;
                customerInfo.Role.Name = RoleSettingService.GetRoleName(customerInfo.RoleID);

                if (!criteria.IsGuest)
                {
                    customerInfo.UplineInfo = await GetUplineInfoOfUser(new GetUplineInfoOfUserCriteria
                    {
                        CustId = customerInfo.Id
                    });
                }
            }
            
            return customerInfo;
        }

        public async Task<IEnumerable<CustomerInfo>> GetUplineInfoOfUser(GetUplineInfoOfUserCriteria criteria)
        {

            var uplineInfoResult = new List<CustomerInfo>();
            var rawData = await baseService.GetDataAsync<CustomerInfo>(criteria);
            foreach (var item in rawData)
            {
                if (criteria.CustId == item.Id || item.RoleID == RoleIdConstants.Headline)
                {
                    continue;
                }
                item.Role.Id = item.RoleID;
                item.Role.Name = RoleSettingService.GetRoleName(item.RoleID);
                uplineInfoResult.Add(item);
            }

            var headline = rawData.Where(i => i.Role.Id == RoleIdConstants.Headline)
                                  .Select(i =>
                                  {
                                      i.Role.Name = RoleSettingService.GetRoleName(i.Role.Id);
                                      return i;
                                  })
                                  .FirstOrDefault() ?? NewUnAssignedCustomerInfo();
            uplineInfoResult.Insert(0, headline);
            return uplineInfoResult;
        }

        private CustomerInfo NewUnAssignedCustomerInfo()
        {
            return new CustomerInfo
            {
                UserName = "Unassigned",
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
