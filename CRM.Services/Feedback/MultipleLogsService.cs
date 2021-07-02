namespace CRM.Services.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;

    public interface IMultipleLogsService
    {
        Task<IEnumerable<VerifyCustomerResult>> VerifyCustomerAsync(VerifyCustomerCriteria criteria);

        Task<IEnumerable<VerifyRelatedCustomerResult>> VerifyRelatedCustomerAsync(VerifyRelatedCustomerCriteria criteria);
    }

    public class MultipleLogsService : IMultipleLogsService
    {
        private readonly IBaseService baseService;

        public MultipleLogsService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<VerifyCustomerResult>> VerifyCustomerAsync(VerifyCustomerCriteria criteria)
        {
            return await baseService.GetDataAsync<VerifyCustomerResult>(criteria);
        }

        public async Task<IEnumerable<VerifyRelatedCustomerResult>> VerifyRelatedCustomerAsync(VerifyRelatedCustomerCriteria criteria)
        {
            return await baseService.GetDataAsync<VerifyRelatedCustomerResult>(criteria);
        }
    }
}
