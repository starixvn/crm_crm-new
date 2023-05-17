

namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Criteria;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models.BotServices;
    using Microsoft.Extensions.Configuration;

    public interface ISendNotificationService
    {
        Task ScanAndSendMessageToBotEndpointAsync();
    }

    public class SendNotificationService : ISendNotificationService
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly IChatBotSendMessageService chatbotService;
        private readonly int ItemEachBatch;
        private const int DefaultItemEachBatch = 10;
        private readonly string BaseImageUrl;

        public SendNotificationService(IBaseService baseService,
            ICRMLogService logService,
            IConfiguration configuration,
            IChatBotSendMessageService chatbotService)
        {
            this.baseService = baseService;
            this.logService = logService;
            this.chatbotService = chatbotService;
            ItemEachBatch = configuration.GetValue<int?>("SendNotificationItemEachBatch") ?? DefaultItemEachBatch;
            BaseImageUrl = configuration.GetValue<string>("BaseImageUrl");
        }

        public async Task ScanAndSendMessageToBotEndpointAsync()
        {
            var notifications = await GetNotificationToSend();

            if (notifications.Any())
            {
                await UpdateBotRemovedStatus(notifications.Where(noti => noti.BotId == 0 && noti.ChatType == ChatType.Group));

                await SendNotification(notifications.Where(noti => noti.BotId > 0));
            }
        }

        private async Task SendNotification(IEnumerable<NotificationMessage> notifications)
        {
            var batches = DivideBatchToSend(notifications);
            foreach (var batch in batches)
            {
                var results = new List<NotificationMessageUpdateResult>();
                try
                {
                    var sendResults = await chatbotService.SendMultipleMessageAsync(batch);
                    results = GetUpdateResultModel(sendResults).ToList();
                }
                catch (Exception ex)
                {
                    foreach (var noti in batch)
                    {
                        results.Add(new NotificationMessageUpdateResult
                        {
                            NotificationId = noti.NotificationId,
                            ConversationGroupId = noti.ConversationGroupId,
                            Status = SendNotificationStatus.Retrying,
                            ErrMsg = SendNotificationErrorMessage.BotServiceErrorMsg
                        });
                    }
                    await logService.ErrorAsync(ex);
                }
                finally
                {
                    await UpdateRecipientStatus(results);
                }
            }
        }

        private List<List<NotificationMessage>> DivideBatchToSend(IEnumerable<NotificationMessage> notifications)
        {
            var batches = new List<List<NotificationMessage>>();
            int totalBatch = (int)Math.Ceiling((double)notifications.Count() / ItemEachBatch);
            for (int i = 0; i < totalBatch; i++)
            {
                batches.Add(notifications.Skip(i * ItemEachBatch).Take(ItemEachBatch).ToList());
            }

            return batches;
        }

        private async Task<IEnumerable<NotificationMessage>> GetNotificationToSend()
        {
            var notifications = await baseService.GetDataAsync<NotificationMessage>(new GetNotificationToSendCriteria());
            if (notifications.Any())
            {
                foreach (var item in notifications)
                {
                    if (item.AnnouncementId > 0 && !string.IsNullOrEmpty(item.FileName))
                    {
                        var images = item.FileName.Split(",");
                        item.Images = images.Select(
                            img => string.Format("{0}{1}/{2}", BaseImageUrl, item.AnnouncementId, img)
                            ).ToArray();
                    }
                }
            }
            return notifications;
        }

        private async Task UpdateBotRemovedStatus(IEnumerable<NotificationMessage> notifications)
        {
            if (notifications.Any())
            {
                var results = new List<NotificationMessageUpdateResult>();
                foreach (var notification in notifications)
                {
                    var result = new NotificationMessageUpdateResult
                    {
                        NotificationId = notification.NotificationId,
                        ConversationGroupId = notification.ConversationGroupId,
                        SentDate = DateTime.UtcNow,
                        Status = SendNotificationStatus.Error,
                        ErrMsg = SendNotificationErrorMessage.BotRemovedMsg
                    };
                    results.Add(result);
                }

                await UpdateRecipientStatus(results);
            }
        }

        private async Task UpdateRecipientStatus(IEnumerable<NotificationMessageUpdateResult> results)
        {
            var command = new UpdateNotificationStatusCommand
            {
                XmlData = results.ToXML("root").ToString()
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        private static IEnumerable<NotificationMessageUpdateResult> GetUpdateResultModel(IEnumerable<SendResult> sendResults)
        {
            var updateResults = new List<NotificationMessageUpdateResult>();
            foreach (var result in sendResults)
            {
                var updateModel = new NotificationMessageUpdateResult
                {
                    NotificationId = result.NotificationId,
                    ConversationGroupId = result.ConversationGroupId,
                    SentDate = result.SentTime,
                    Status = GetUpdateStatus(result),
                    ErrMsg = result.ErrorMessage
                };
                updateResults.Add(updateModel);
            }

            return updateResults;
        }

        private static string GetUpdateStatus(SendResult result)
        {
            if (result.IsBlockedBot)
            {
                return SendNotificationStatus.BotBlocked;
            }
            if (result.IsSuccessful && !result.IsBlockedBot)
            {
                return SendNotificationStatus.Sent;
            }
            if (!result.IsSuccessful && !result.IsIgnoreRetry)
            {
                return SendNotificationStatus.Retrying;
            }
            return SendNotificationStatus.Error;
        }

        private static class SendNotificationStatus
        {
            internal const string BotBlocked = "BotBlocked";
            internal const string Sent = "Sent";
            internal const string Retrying = "Retrying";
            internal const string Error = "Error";
        }
    }
}
