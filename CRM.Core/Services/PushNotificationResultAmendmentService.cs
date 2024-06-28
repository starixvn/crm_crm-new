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
        Task PushNotificationMessageAsync(string environment);
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

        public async Task PushNotificationMessageAsync(string environment)
        {
            try
            {
                var mncNotifications = await GetPrepareNotificationAsync(environment);
                if (mncNotifications.Any())
                {
                    foreach (var item in mncNotifications)
                    {
                        var command = new GetMessageResultAmendmentCommand
                        {
                            NotificationID = item.NotificationID,
                            JSNotification = item.JSNotification
                        };
                        await GetMessageResultAmendmentAsync(command);
                        await EditPushNotificationResultAmendmentAsync(item.NotificationID, command.MessageID, environment, "AfterInsMsg");
                        await EditPushMessageResultAmendmentAsync(command.MessageID, "AfterUpdNoti");
                    }
                    await InsertCompleteResultAmendmentAsync(environment);
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        public async Task<IEnumerable<MncMessageTarget>> GetPrepareNotificationAsync(string environment)
        {
            var criteria = new GetPrepareNotiResultAmendmentCriteria
            {
                Environment = environment
            };
            return await baseService.GetDataAsync<MncMessageTarget>(criteria);
        }

        public async Task GetMessageResultAmendmentAsync(GetMessageResultAmendmentCommand command)
        {
            await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task EditPushNotificationResultAmendmentAsync(int notificationID, int messageID, string environment, string updType)
        {
            var command = new EditNotiResultAmendmentCommand
            {
                NotificationID = notificationID,
                MessageID = messageID,
                Environment = environment,
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

        public async Task InsertCompleteResultAmendmentAsync(string environment)
        {
            var commmand = new InsertCompleteResultAmendmentCommand
            {
                Environment = environment
            };
            await baseService.ExecuteNonQueryAsync(commmand);
        }
    }
}
