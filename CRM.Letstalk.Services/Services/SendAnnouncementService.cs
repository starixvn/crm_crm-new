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
    using CRM.Letstalk.Services.Services.Interfaces;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    public class SendAnnouncementService : ISendAnnouncementService
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly Func<int, ILetstalkService> letstalkService;
        private readonly string BaseImageUrl;
        private const string formatImageUrl = "{0}{1}/{2}";
        private const byte MaxReceiversOnOneBatch = 10;

        public SendAnnouncementService(IBaseService baseService,
            ICRMLogService logService,
            IConfiguration configuration,
            Func<int, ILetstalkService> letstalkService)
        {
            this.baseService = baseService;
            this.logService = logService;
            this.letstalkService = letstalkService;
            BaseImageUrl = configuration.GetValue<string>("BaseImageUrl");
        }

        public async Task ScanThenSendAsnyc()
        {
            var notifications = await GetNotificationToSend();

            if (notifications.Any())
            {
                await UpdateBotRemovedGroup(notifications.Where(n => n.ChatType == ChatType.Group && n.BotId <= 0));
                await RetryOnlyImages(notifications.Where(n => n.BotId > 0 && n.IsOnlyRetryImage));
                await SendAnnouncementNotificationAsync(notifications.Where(n => n.BotId > 0 && !n.IsOnlyRetryImage));
            }
        }

        #region Update Bot Removed Groups

        private async Task UpdateBotRemovedGroup(IEnumerable<AnnouncementNotification> botRemovedNotifications)
        {
            if (botRemovedNotifications.Any())
            {
                var updateStatusResult = new List<SendAnnouncementUpdateStatus>();
                foreach (var item in botRemovedNotifications)
                {
                    updateStatusResult.Add(new SendAnnouncementUpdateStatus
                    {
                        NotificationId = item.NotificationId,
                        ConversationGroupId = item.ConversationGroupId,
                        Status = SendNotificationStatus.Error,
                        ErrMsg = SendNotificationErrMsg.BotRemovedMsg
                    });
                }
                await UpdateRecipientStatus(updateStatusResult);
            }
        }

        #endregion Update Bot Removed Groups

        #region Retry send images only

        private async Task RetryOnlyImages(IEnumerable<AnnouncementNotification> notifications)
        {
            if (notifications.Any())
            {
                var groupedNotifications = GroupResendErrorImages(notifications);
                var tasks = new List<Task<List<SendAnnouncementResult>>>();
                foreach (var notification in groupedNotifications)
                {
                    tasks.Add(Task.Run(() => ResendErrorImagesAsync(notification)));
                }

                var sendReults = (await Task.WhenAll(tasks)).ToList();

                List<SendAnnouncementResult> mergedResults = MergedResultList(sendReults);
                List<SendAnnouncementUpdateStatus> updatedResult = MappingSendResultToUpdateStatus(mergedResults, notifications);

                await UpdateRecipientStatus(updatedResult);
            }
        }

        private async Task<List<SendAnnouncementResult>> ResendErrorImagesAsync(NotificationGroupContent notification)
        {
            var sendResult = notification.ConversationIds.Select(conversationId =>
            new SendAnnouncementResult
            {
                AnnouncementId = notification.AnnouncementId,
                ConversationId = conversationId,
                IsSuccessful = true,
                ErrMsg = string.Empty
            }).ToList();

            if (notification.ChatType == ChatType.Personal)
            {
                await SendImageMultiplePersonalAsync(notification.AnnouncementId, notification.ConversationIds, notification.BotId, notification.Attachments, sendResult);
            }
            else
            {
                await SendImageToMultipleGroupAsync(notification.AnnouncementId, notification.ConversationIds, notification.BotId, notification.Attachments, sendResult);
            }

            return sendResult;
        }

        private static List<NotificationGroupContent> GroupResendErrorImages(IEnumerable<AnnouncementNotification> notifications)
        {
            var groupedNotification = notifications.GroupBy(i =>
            new
            {
                i.AnnouncementId,
                i.BotId,
                i.ChatType,
                i.ErrImages
            }).Select(item =>
            {
                return new NotificationGroupContent
                {
                    AnnouncementId = item.Key.AnnouncementId,
                    BotId = item.Key.BotId,
                    ChatType = item.Key.ChatType,
                    ConversationIds = item.Select(x => x.ConversationId).ToList(),
                    Attachments = !string.IsNullOrWhiteSpace(item.Key.ErrImages) ? item.Key.ErrImages.Split(",").ToList() : new List<string>(),
                };
            });
            var results = DividedBatchRecivers(groupedNotification);
            return results;
        }

        #endregion Retry send images only

        #region Send Announcement Notification

        private async Task SendAnnouncementNotificationAsync(IEnumerable<AnnouncementNotification> notifications)
        {
            if (notifications.Any())
            {
                List<NotificationGroupContent> groupedContentNotifications = GroupNotificationByContentAndChatType(notifications);
                var sendResults = new List<SendAnnouncementResult>();
                foreach (var notification in groupedContentNotifications)
                {
                    var result = await SendToLetstalkAsync(notification);
                    sendResults.AddRange(result);
                }

                List<SendAnnouncementUpdateStatus> updatedResult = MappingSendResultToUpdateStatus(sendResults, notifications);

                await UpdateRecipientStatus(updatedResult);
            }
        }

        private static List<SendAnnouncementResult> MergedResultList(List<List<SendAnnouncementResult>> sendReults)
        {
            var results = new List<SendAnnouncementResult>();
            foreach (var sendResult in sendReults)
            {
                results.AddRange(sendResult);
            }
            return results;
        }

        private static List<SendAnnouncementUpdateStatus> MappingSendResultToUpdateStatus(List<SendAnnouncementResult> mergedResults, IEnumerable<AnnouncementNotification> notifications)
        {
            var results = new List<SendAnnouncementUpdateStatus>();
            foreach (var notification in notifications)
            {
                var matchedResult = mergedResults.FirstOrDefault(x => x.ConversationId.Equals(notification.ConversationId) && x.AnnouncementId == notification.AnnouncementId);
                if (matchedResult is not null)
                {
                    var result = new SendAnnouncementUpdateStatus
                    {
                        NotificationId = notification.NotificationId,
                        ConversationGroupId = notification.ConversationGroupId,
                        IsOnlyRetryImage = matchedResult.IsOnlyRetryImage,
                        ErrImages = matchedResult.ErrImages is not null && matchedResult.ErrImages.Count > 0 ? string.Join(",", matchedResult.ErrImages) : string.Empty
                    };
                    MappingUpdateStatusErrorMessage(result, matchedResult);
                    results.Add(result);
                }
            }
            return results;
        }

        private static void MappingUpdateStatusErrorMessage(SendAnnouncementUpdateStatus result, SendAnnouncementResult matchedResult)
        {
            if (matchedResult.IsSuccessful)
            {
                result.Status = SendNotificationStatus.Sent;
                result.ErrMsg = string.Empty;
            }

            if (!matchedResult.IsSuccessful && !matchedResult.IsBotBlocked)
            {
                result.Status = SendNotificationStatus.Retrying;
                result.ErrMsg = matchedResult.ErrMsg;
            }
            if (matchedResult.IsBotBlocked)
            {
                result.Status = SendNotificationStatus.BotBlocked;
                result.ErrMsg = string.Empty;
            }
        }

        private async Task<List<SendAnnouncementResult>> SendToLetstalkAsync(NotificationGroupContent notification)
        {
            List<SendAnnouncementResult> sendResult = notification.ChatType == ChatType.Personal
                ? await SendMessageToMultiplePersonalAsync(notification)
                : await SendMessageToMulipleGroupAsync(notification);
            return sendResult;
        }

        #endregion Send Announcement Notification

        #region Send Personal

        private async Task<List<SendAnnouncementResult>> SendMessageToMultiplePersonalAsync(NotificationGroupContent notification)
        {
            var sendResult = notification.ConversationIds.Select(conversationId =>
            new SendAnnouncementResult
            {
                AnnouncementId = notification.AnnouncementId,
                ConversationId = conversationId,
                IsSuccessful = true,
                ErrMsg = string.Empty
            }).ToList();
            try
            {
                var pushResults = await letstalkService(notification.BotId).PushPersonalAsync(notification.ConversationIds,
                new OutgoingMessage
                {
                    MessageType = MessageTypeNumber.Html,
                    Text = notification.Content
                });
                await WriteLogMessage(notification.AnnouncementId, notification.BotId, notification.Content,
                    string.Join(",", notification.ConversationIds), pushResults.IsSuccess, JsonConvert.SerializeObject(pushResults));

                if (pushResults.IsSuccess)
                {
                    if (pushResults.FailList is not null && pushResults.FailList.Count > 0)
                    {
                        HandleFailedList(pushResults.FailList, sendResult);
                    }

                    if (pushResults.BlockList is not null && pushResults.BlockList.Count > 0)
                    {
                        HandlleBlockList(pushResults.BlockList, sendResult);
                    }
                }
                else
                {
                    SetFailedResultWithErrMsg(sendResult);
                }
            }
            catch (Exception exception)
            {
                SetFailedResultWithErrMsg(sendResult);
                await logService.ErrorAsync(exception);
            }

            var successList = sendResult.Where(i => i.IsSuccessful).Select(x => x.ConversationId).ToList();
            if (successList.Any() && notification.Attachments is not null && notification.Attachments.Any())
            {
                await SendImageMultiplePersonalAsync(notification.AnnouncementId, successList, notification.BotId, notification.Attachments, sendResult);
            }

            return sendResult;
        }

        private async Task SendImageMultiplePersonalAsync(int announcementId, List<string> conversationIds, int botId, List<string> images, List<SendAnnouncementResult> sendResult)
        {
            var pushResult = new PushMessageResult();
            foreach (var img in images)
            {
                string imgUrl = GenerateImgLink(announcementId, img);
                try
                {
                    pushResult = await letstalkService(botId).PushPersonalAsync(conversationIds, new OutgoingMessage
                    {
                        MessageType = MessageTypeNumber.Image,
                        ImageUrl = imgUrl
                    });
                    await WriteLogMessage(announcementId, botId, imgUrl, string.Join(",", conversationIds), pushResult.IsSuccess, JsonConvert.SerializeObject(pushResult));
                }
                catch (Exception ex)
                {
                    pushResult.Status = 0;
                    pushResult.Message = ex.Message;
                    pushResult.FailList = conversationIds;
                    await WriteLogMessage(announcementId, botId, imgUrl, string.Join(",", conversationIds), pushResult.IsSuccess, JsonConvert.SerializeObject(pushResult));
                    await logService.ErrorAsync(ex);
                }

                UpdateSendImageResultStatus(pushResult, sendResult, img);
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

        #endregion Send Personal

        #region Send group

        private async Task<List<SendAnnouncementResult>> SendMessageToMulipleGroupAsync(NotificationGroupContent notification)
        {
            var sendResult = notification.ConversationIds.Select(conversationId =>
            new SendAnnouncementResult
            {
                AnnouncementId = notification.AnnouncementId,
                ConversationId = conversationId,
                IsSuccessful = true,
                ErrMsg = string.Empty
            }).ToList();

            try
            {
                var pushResults = await letstalkService(notification.BotId).PushMultiRoomAsync(notification.ConversationIds,
                new OutgoingMessage
                {
                    MessageType = MessageTypeNumber.Html,
                    Text = notification.Content
                });
                await WriteLogMessage(notification.AnnouncementId, notification.BotId, notification.Content,
                    string.Join(",", notification.ConversationIds), pushResults.IsSuccess, JsonConvert.SerializeObject(pushResults));
                if (pushResults.IsSuccess)
                {
                    if (pushResults.FailList is not null && pushResults.FailList.Count > 0)
                    {
                        HandleFailedList(pushResults.FailList, sendResult);
                    }
                }
                else
                {
                    SetFailedResultWithErrMsg(sendResult);
                }
            }
            catch (Exception exception)
            {
                SetFailedResultWithErrMsg(sendResult);
                await logService.ErrorAsync(exception);
            }

            var successList = sendResult.Where(i => i.IsSuccessful).Select(x => x.ConversationId).ToList();
            if (successList.Any() && notification.Attachments is not null && notification.Attachments.Any())
            {
                await SendImageToMultipleGroupAsync(notification.AnnouncementId, successList, notification.BotId, notification.Attachments, sendResult);
            }

            return sendResult;
        }

        private static void SetFailedResultWithErrMsg(List<SendAnnouncementResult> results)
        {
            foreach (var item in results)
            {
                item.IsSuccessful = false;
                item.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;
            }
        }

        private async Task SendImageToMultipleGroupAsync(int announcementId, List<string> conversationIds, int botId, List<string> images, List<SendAnnouncementResult> sendResult)
        {
            var pushResult = new PushMessageResult();
            foreach (var img in images)
            {
                string imgUrl = GenerateImgLink(announcementId, img);
                try
                {
                    pushResult = await letstalkService(botId).PushMultiRoomAsync(conversationIds, new OutgoingMessage
                    {
                        MessageType = MessageTypeNumber.Image,
                        ImageUrl = imgUrl
                    });
                    await WriteLogMessage(announcementId, botId, imgUrl, string.Join(",", conversationIds), pushResult.IsSuccess, JsonConvert.SerializeObject(pushResult));
                }
                catch (Exception ex)
                {
                    pushResult.Status = 0;
                    pushResult.Message = ex.Message;
                    pushResult.FailList = conversationIds;
                    await WriteLogMessage(announcementId, botId, imgUrl, string.Join(",", conversationIds), pushResult.IsSuccess, JsonConvert.SerializeObject(pushResult));
                }
                UpdateSendImageResultStatus(pushResult, sendResult, img);
            }
        }

        #endregion Send group

        #region Common Functions

        private string GenerateImgLink(int announcementId, string img) => string.Format(formatImageUrl, BaseImageUrl, announcementId, img);

        private static void UpdateSendImageResultStatus(PushMessageResult pushResult, List<SendAnnouncementResult> sendResult, string image)
        {
            if (!pushResult.IsSuccess)
            {
                foreach (var result in sendResult)
                {
                    SetResultSendImage(result, image);
                }
            }
            else
            {
                foreach (var result in sendResult.Where(result => pushResult.FailList.Any(i => i.Equals(result.ConversationId))))
                {
                    SetResultSendImage(result, image);
                }
            }
        }

        private static void SetResultSendImage(SendAnnouncementResult result, string failedImage)
        {
            result.IsSuccessful = false;
            result.IsOnlyRetryImage = true;
            result.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;

            result.ErrImages.Add(failedImage);
        }

        private static void HandleFailedList(List<string> failList, List<SendAnnouncementResult> sendResult)
        {
            foreach (var result in sendResult.Where(result => failList.Any(i => i.Equals(result.ConversationId))))
            {
                result.IsSuccessful = false;
                result.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;
            }
        }

        private static List<NotificationGroupContent> GroupNotificationByContentAndChatType(IEnumerable<AnnouncementNotification> notifications)
        {
            var groupedNotification = notifications.GroupBy(i =>
            new
            {
                i.AnnouncementId,
                i.Content,
                i.BotId,
                i.ChatType,
            }).Select(item =>
            {
                return new NotificationGroupContent
                {
                    AnnouncementId = item.Key.AnnouncementId,
                    BotId = item.Key.BotId,
                    Content = item.Key.Content,
                    ChatType = item.Key.ChatType,
                    ConversationIds = item.Select(x => x.ConversationId).ToList(),
                    Attachments = !string.IsNullOrWhiteSpace(item.FirstOrDefault().FileName) ? item.FirstOrDefault().FileName.Split(",").ToList() : new List<string>(),
                };
            });

            var results = DividedBatchRecivers(groupedNotification);
            return results;
        }

        private static List<NotificationGroupContent> DividedBatchRecivers(IEnumerable<NotificationGroupContent> notifications)
        {
            var listResults = new List<NotificationGroupContent>();
            foreach (var item in notifications)
            {
                if (item.ConversationIds.Count <= MaxReceiversOnOneBatch)
                {
                    listResults.Add(item);
                }
                else
                {
                    var batches = DivideBatchConversationIds(item);
                    listResults.AddRange(batches);
                }
            }
            return listResults;
        }

        private static List<NotificationGroupContent> DivideBatchConversationIds(NotificationGroupContent item)
        {
            int totalItem = item.ConversationIds.Count;
            var listResults = new List<NotificationGroupContent>();
            int totalBatch = (int)Math.Ceiling((double)totalItem / MaxReceiversOnOneBatch);
            for (int i = 0; i < totalBatch; i++)
            {
                listResults.Add(new NotificationGroupContent
                {
                    AnnouncementId = item.AnnouncementId,
                    BotId = item.BotId,
                    Content = item.Content,
                    ChatType = item.ChatType,
                    ConversationIds = item.ConversationIds.Skip(i * MaxReceiversOnOneBatch).Take(MaxReceiversOnOneBatch).ToList(),
                    Attachments = item.Attachments
                });
            }
            return listResults;
        }

        private async Task WriteLogMessage(int notificationId, long botId, string content, string conversationIds, bool isSuccess, string errMsg)
        {
            var command = new WriteLogMessageCommand
            {
                ReferenceId = notificationId,
                DataSource = "DBCRM.bodb_CRM.dbo.crmAnnouncement",
                BotId = botId,
                Content = content,
                ConversationId = conversationIds,
                IsSuccess = isSuccess,
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        #endregion Common Functions

        private async Task UpdateRecipientStatus(List<SendAnnouncementUpdateStatus> sentResults)
        {
            var command = new UpdateAnnouncementNotificationStatusCommand
            {
                XmlData = sentResults.ToXML("root").ToString()
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        private async Task<IEnumerable<AnnouncementNotification>> GetNotificationToSend()
        {
            var notifications = await baseService.GetDataAsync<AnnouncementNotification>(new GetAnnouncementNotificationToSendCriteria());

            return notifications;
        }
    }
}