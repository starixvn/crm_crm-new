namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.PushResultAmendment;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Services;

    public interface IPushNotificationResultAmendmentService
    {
        Task<IEnumerable<MncMessageTarget>> GetPrepareNotificationAsync();

        Task GetMessageResultAmendmentAsync(GetMessageResultAmendmentCommand command);

        Task EditPushNotificationResultAmendmentAsync(int notificationID, int messageID, string updType);

        Task EditPushMessageResultAmendmentAsync(int messageID, string updType);

        Task InsertCompleteResultAmendmentAsync();
    }

    public class PushNotificationResultAmendmentService : IPushNotificationResultAmendmentService
    {
        private readonly IBaseService baseService;

        public PushNotificationResultAmendmentService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<MncMessageTarget>> GetPrepareNotificationAsync()
        {
            var criteria = new GetPrepareNotiResultAmendmentCriteria();
            return await baseService.GetDataAsync<MncMessageTarget>(criteria);
        }

        public async Task GetMessageResultAmendmentAsync(GetMessageResultAmendmentCommand command)
        {
            await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task EditPushNotificationResultAmendmentAsync(int notificationID, int messageID, string updType)
        {
            var command = new EditNotiResultAmendmentCommand
            {
                NotificationID = notificationID,
                MessageID = messageID,
                UpdType = updType
            };
            await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task EditPushMessageResultAmendmentAsync(int messageID, string updType)
        {
            var command = new EditMessageResultAmendmentCommand
            {
                MessageID = messageID,
                UpdType = updType
            };
            await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task InsertCompleteResultAmendmentAsync()
        {
            var commmand = new InsertCompleteResultAmendmentCommand();
            await baseService.ExecuteNonQueryAsync(commmand);
        }
    }
}
