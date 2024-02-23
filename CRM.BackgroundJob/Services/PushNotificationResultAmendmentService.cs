namespace CRM.BackgroundJob.Services
{
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.PushResultAmendment;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Services;

    public interface IPushNotificationResultAmendmentService
    {
        Task<MncMessageTarget> GetPreparePushNotificationAsync();

        Task<MncNotification> GetMessagePushResultAmendmentAsync(string mnc_msg, string mnc_msgTarget);

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

        public async Task<MncNotification> GetMessagePushResultAmendmentAsync(string mnc_msg, string mnc_msgTarget)
        {
            var criteria = new GetMessagePushResultAmendmentCriteria
            {
                MNC_Msg = mnc_msg,
                MNC_MsgTarget = mnc_msgTarget
            };
            return await baseService.GetDataEntityAsync<MncNotification>(criteria);
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
