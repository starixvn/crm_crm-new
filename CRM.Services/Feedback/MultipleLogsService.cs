namespace CRM.Services.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;

    public interface IMultipleLogsService
    {
        Task<IEnumerable<VerifyCustomerResult>> VerifyCustomerAsync(VerifyCustomerCriteria criteria);

        Task<IEnumerable<VerifyRelatedCustomerResult>> VerifyRelatedCustomerAsync(VerifyRelatedCustomerCriteria criteria);

        Task<IEnumerable<VerifyCommunicationToolSetting>> CheckNotExistCommunicationToolSettingAsync(CheckNotExistCommunicationToolSettingCriteria criteria);
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

        public async Task<IEnumerable<VerifyCommunicationToolSetting>> CheckNotExistCommunicationToolSettingAsync(CheckNotExistCommunicationToolSettingCriteria criteria)
        {
            return await baseService.GetDataAsync<VerifyCommunicationToolSetting>(criteria);
        }
    }
}