namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Criteria.PushResultAmendment;
    using CRM.Core.Models;

    public interface IPushNotificationResultAmendmentService
    {
        Task PushNotificationMessageAsync();
    }

    public class PushNotificationResultAmendmentService : IPushNotificationResultAmendmentService
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;

        public PushNotificationResultAmendmentService(IBaseService baseService, ICRMLogService logService)
        {
            this.baseService = baseService;
            this.logService = logService;
        }

        public async Task PushNotificationMessageAsync()
        {
            try
            {
                var mncNotifications = await GetPrepareNotificationAsync();
                if (!mncNotifications.Any())
                {
                    await InsertCompleteResultAmendmentAsync();
                }
                else
                {
                    foreach (var item in mncNotifications)
                    {
                        var command = new GetMessageResultAmendmentCommand
                        {
                            NotificationID = item.NotificationID,
                            JSNotification = item.JSNotification
                        };
                        await GetMessageResultAmendmentAsync(command);
                        await EditPushNotificationResultAmendmentAsync(item.NotificationID, command.MessageID, "AfterInsMsg");
                        await EditPushMessageResultAmendmentAsync(command.MessageID, "AfterUpdNoti");
                    }
                    await InsertCompleteResultAmendmentAsync();
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
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
