namespace CRM.Letstalk.Services.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Services;
    using CRM.Letstalk.Client.Enum;
    using CRM.Letstalk.Client.Models;
    using CRM.Letstalk.Client.Models.Results;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Services.Constants;
    using CRM.Letstalk.Services.Criteria;
    using CRM.Letstalk.Services.Models.SendAnnouncement;
    using CRM.Letstalk.Services.Models.SendNotification;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    public class SendAnnouncementService : ISendAnnouncementService
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly Func<int, ILetstalkService> letstalkService;
        private readonly int ItemEachBatch;
        private const int DefaultItemEachBatch = 10;
        private readonly string BaseImageUrl;

        private readonly string formatImageUrl = "{0}{1}/{2}";

        public SendAnnouncementService(IBaseService baseService,
            ICRMLogService logService,
            IConfiguration configuration,
            Func<int, ILetstalkService> letstalkService)
        {
            this.baseService = baseService;
            this.logService = logService;
            this.letstalkService = letstalkService;
            ItemEachBatch = configuration.GetValue<int?>("SendNotificationItemEachBatch") ?? DefaultItemEachBatch;
            BaseImageUrl = configuration.GetValue<string>("BaseImageUrl");
        }

        public async Task ScanThenSendAsnyc()
        {
            var notifications = await GetNotificationToSend();
            List<NotificationGroupContent> groupedContentNotifications = GroupNotificationByContentAndChatType(notifications);
            var tasks = new List<Task<List<SendAnnouncementResult>>>();
            foreach (var notification in groupedContentNotifications)
            {
                tasks.Add(Task.Run(() => SendToLetstalkAsync(notification)));
            }

            var results = (await Task.WhenAll(tasks)).ToList();

            //await UpdateRecipientStatus(results);
        }

        private async Task<List<SendAnnouncementResult>> SendToLetstalkAsync(NotificationGroupContent notification)
        {
            var sendResult = new List<SendAnnouncementResult>();
            try
            {
                if (notification.ChatType == ChatType.Personal)
                {
                    sendResult = await SendToPersonal(notification);
                }
                else
                {
                }
            }
            catch (Exception exception)
            {
                foreach (var item in notification.ConversationIds)
                {
                    sendResult.Add(new SendAnnouncementResult
                    {
                        AnnouncementId = notification.AnnouncementId,
                        ConversationId = item,
                        IsSuccessful = false,
                        ErrMsg = exception.Message
                    });
                }
            }

            return sendResult;
        }

        private async Task<List<SendAnnouncementResult>> SendToPersonal(NotificationGroupContent notification)
        {
            var sendResult = notification.ConversationIds.Select(conversationId =>
            new SendAnnouncementResult
            {
                AnnouncementId = notification.AnnouncementId,
                ConversationId = conversationId,
                IsSuccessful = true,
                ErrMsg = string.Empty
            }).ToList();

            var pushResults = await letstalkService(notification.BotId)
                .PushPersonalAsync(notification.ConversationIds,
                    new OutgoingMessage
                    {
                        MessageType = MessageTypeNumber.Html,
                        Text = notification.Content
                    });
            await WriteLogMessage(notification.AnnouncementId, notification.BotId, notification.Content, string.Join(",", notification.ConversationIds), pushResults.IsSuccess, JsonConvert.SerializeObject(pushResults));

            if (pushResults.FailList is not null && pushResults.FailList.Count > 0)
            {
                HandleFailedList(pushResults.FailList, sendResult);
            }

            if (pushResults.BlockList is not null && pushResults.BlockList.Count > 0)
            {
                HandlleBlockList(pushResults.BlockList, sendResult);
            }

            var successList = sendResult.Where(i => i.IsSuccessful).Select(x => x.ConversationId).ToList();
            if (notification.Attachments is not null && notification.Attachments.Any())
            {
                await SendImagePersonalAsync(notification.AnnouncementId, successList, notification.BotId, notification.Attachments, sendResult);
            }

            return sendResult;
        }

        private async Task SendImagePersonalAsync(int announcementId, List<string> successList, int botId, List<string> attachments, List<SendAnnouncementResult> sendResult)
        {
            var pushResult = new PushMessageResult();
            foreach (var attachment in attachments)
            {
                pushResult = await letstalkService(botId).PushPersonalAsync(successList, new OutgoingMessage
                {
                    MessageType = MessageTypeNumber.Image,
                    ImageUrl = attachment
                });
                UpateSendResultStatus(pushResult, sendResult, attachment);
                await WriteLogMessage(announcementId, botId, attachment, string.Join(",", successList), pushResult.IsSuccess, JsonConvert.SerializeObject(pushResult));
            }
        }

        private void UpateSendResultStatus(PushMessageResult pushResult, List<SendAnnouncementResult> sendResult, string image)
        {
            foreach (var result in sendResult.Where(result => pushResult.FailList.Any(i => i.Equals(result.ConversationId))))
            {
                result.IsSuccessful = false;
                result.IsOnlyRetryImage = true;
                result.ErrImages.Add(image);
                result.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;
            }
        }

        private static void HandlleBlockList(List<string> blockList, List<SendAnnouncementResult> sendResult)
        {
            foreach (var result in sendResult.Where(result => blockList.Any(i => i.Equals(result.ConversationId))))
            {
                result.IsSuccessful = false;
                result.IsBotBlocked = true;
            }
        }

        private static void HandleFailedList(List<string> failList, List<SendAnnouncementResult> sendResult)
        {
            foreach (var result in sendResult.Where(result => failList.Any(i => i.Equals(result.ConversationId))))
            {
                result.IsSuccessful = false;
                result.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;
            }
        }

        private async Task UpdateRecipientStatus(IEnumerable<SendNotificationResult> sentResults)
        {
            var command = new UpdateNotificationStatusCommand
            {
                XmlData = sentResults.ToXML("root").ToString()
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        private List<NotificationGroupContent> GroupNotificationByContentAndChatType(IEnumerable<NotificationMessage> notifications)
        {
            var groupedNotification = notifications.GroupBy(i =>
            new
            {
                i.AnnouncementId,
                i.BotId,
                i.ChatType,
                i.Content
            }).Select(item =>
            {
                return new NotificationGroupContent
                {
                    BotId = item.Key.BotId,
                    Content = item.Key.Content,
                    ChatType = item.Key.ChatType,
                    ConversationIds = item.Select(x => x.ConversationId).ToList(),
                    Attachments = GenerateAttachments(item.Key.AnnouncementId, item.FirstOrDefault().FileName),
                };
            });

            return groupedNotification.ToList();
        }

        private List<string> GenerateAttachments(int announcementId, string fileName)
        {
            var result = new List<string>();
            if (!string.IsNullOrWhiteSpace(fileName))
            {
                var images = fileName.Split(',');
                result = images.Select(x =>
                {
                    return string.Format(formatImageUrl, BaseImageUrl, announcementId, x);
                }).ToList();
            }
            return result;
        }

        private async Task<IEnumerable<NotificationMessage>> GetNotificationToSend()
        {
            var notifications = await baseService.GetDataAsync<NotificationMessage>(new GetNotificationToSendCriteria());

            return notifications.Where(x => x.AnnouncementId > 0);
        }

        private async Task WriteLogMessage(int notificationId, int botId, string content, string conversationIds, bool isSuccess, string errMsg)
        {
            var command = new WriteLogMessageCommand
            {
                NotificationId = notificationId,
                BotId = botId,
                Content = content,
                ConversationId = conversationIds,
                IsSuccess = isSuccess,
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}