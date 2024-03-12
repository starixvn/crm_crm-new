namespace CRM.BackgroundJob.Services
{
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.PushResultAmendment;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Services;

    public interface IPushNotificationResultAmendmentService
    {
        Task<MncMessageTarget> GetPreparePushNotificationAsync();

        Task GetMessagePushResultAmendmentAsync(int notificationID, string jsNotification);

        Task EditPushNotificationResultAmendmentAsync(int notificationID, int messageID, string updType);

        Task EditPushMessageResultAmendmentAsync(int messageID, string updType);

        Task InsertPushResultAmendmentAsync(string notificationIDs, string messageIDs);
    }

    public class PushNotificationResultAmendmentService : IPushNotificationResultAmendmentService
    {
        private readonly IBaseService baseService;

        public PushNotificationResultAmendmentService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<MncMessageTarget> GetPreparePushNotificationAsync()
        {
            var criteria = new GetPreparePushNotificationCriteria();
            return await baseService.GetDataEntityAsync<MncMessageTarget>(criteria);
        }

        public async Task GetMessagePushResultAmendmentAsync(int notificationID, string jsNotification)
        {
            var command = new GetPushResultAmendmentCommand
            {
                NotificationID = notificationID,
                JSNotification = jsNotification
            };
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

        public async Task InsertPushResultAmendmentAsync(string notificationIDs, string messageIDs)
        {
            var commmand = new InsertPushResultAmendmentCommand
            {
                NotificationIDs = notificationIDs,
                MessageIDs = messageIDs
            };
            await baseService.ExecuteNonQueryAsync(commmand);
        }
    }
}
