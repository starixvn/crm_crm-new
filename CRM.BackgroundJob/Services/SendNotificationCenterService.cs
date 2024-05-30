namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.SendNotificationCenter;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Models;
    using CRM.Core.Services;

    public interface ISendNotificationCenterService
    {
        Task<CommandResult> InsertNotificationAlertAsync();

        Task<IEnumerable<MessageBotInfo>> GetNotificationAlertAsync();
    }

    public class SendNotificationCenterService : ISendNotificationCenterService
    {
        private readonly IBaseService baseService;

        public SendNotificationCenterService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<CommandResult> InsertNotificationAlertAsync() {
            var command = new InsertNotificationAlertCommand();
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<IEnumerable<MessageBotInfo>> GetNotificationAlertAsync()
        {
            var criteria = new GetNotificationAlerCriteria();
            return await baseService.GetDataAsync<MessageBotInfo>(criteria);
        }
    }
}
