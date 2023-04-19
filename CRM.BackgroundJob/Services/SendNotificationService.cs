namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.SendNotification;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
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
                var result = await chatbotService.SendMultipleMessageAsync(batch);

                await UpdateRecipientStatus(result);
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
            //var notifications = FakeNotfications();
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
                var results = new List<SendResult>();
                foreach (var notification in notifications)
                {
                    var result = new SendResult
                    {
                        NotificationId = notification.NotificationId,
                        ConversationId = notification.ConversationId,
                    };
                    results.Add(result);
                }

                await UpdateRecipientStatus(results);
            }
        }

        private async Task UpdateRecipientStatus(IEnumerable<SendResult> sentResults)
        {
            var command = new UpdateNotificationStatusCommand
            {
                XmlData = sentResults.ToXML("root").ToString()
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        private IEnumerable<NotificationMessage> FakeNotfications()
        {
            var list = new List<NotificationMessage>
            {
                new NotificationMessage
                {
                    NotificationId  = 1,
                    BotId = 100020,
                    ChatTypeId = 2,
                    ConversationId = "t381023",
                    Content = "This is text"
                },
                new NotificationMessage
                {
                    NotificationId = 2,
                    BotId = 100020,
                    ChatTypeId = 1,
                    ConversationId = "m4D5zCUv4_mLmdiPZM5qzWwFCaskz1nDVLHSYbGKjps2Uq9D_W_iobD8tWyNJh24",
                    Content = "Oliver testing"
                },
                new NotificationMessage
                {
                    AnnouncementId = 62567,
                    NotificationId = 3,
                    BotId = 100020,
                    ChatTypeId = 1,
                    ConversationId = "m4D5zCUv4_mLmdiPZM5qzWwFCaskz1nDVLHSYbGKjps2Uq9D_W_iobD8tWyNJh24",
                    Content = "Oliver testing",
                    FileName = "images.jpg,istockphoto-1322277517-612x612.jpg,tree-736885_   _480.jpg"
                },
            };
            return list;
        }
    }
}