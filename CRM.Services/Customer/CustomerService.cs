namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;

    public interface ICustomerService
    {
        Task<IEnumerable<BaseModel>> VerifyUsernameAsync(VerifyRelatedCustomerCriteria criteria);
    }

    public class CustomerService : ICustomerService
    {
        private readonly IBaseService baseService;

        public CustomerService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<BaseModel>> VerifyUsernameAsync(VerifyRelatedCustomerCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<BaseModel>(criteria);
            return customers;
        }
    }
}