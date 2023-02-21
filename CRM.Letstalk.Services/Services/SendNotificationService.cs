namespace CRM.Letstalk.Services.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
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
    using CRM.Letstalk.Services.Models.SendNotification;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    public class SendNotificationService : ISendNotificationService
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly Func<int, ILetstalkService> letstalkService;
        private readonly int ItemEachBatch;
        private const int DefaultItemEachBatch = 10;

        public SendNotificationService(IBaseService baseService,
            ICRMLogService logService,
            IConfiguration configuration,
            IWebHostEnvironment webHostEnvironment,
            Func<int, ILetstalkService> letstalkService)
        {
            this.baseService = baseService;
            this.logService = logService;
            this.letstalkService = letstalkService;
            this.webHostEnvironment = webHostEnvironment;
            ItemEachBatch = configuration.GetValue<int?>("SendNotificationItemEachBatch") ?? DefaultItemEachBatch;
        }

        public async Task SendNotificationToLetstalk()
        {
            var notifications = await GetNotificationToSend();

            if (notifications.Any())
            {
                await UpdateBotRemovedStatus(notifications.Where(noti => noti.BotId == 0 && noti.ChatType == ChatType.Group));

                await SendNotification(notifications.Where(noti => noti.BotId > 0));
            }
        }

        private async Task UpdateBotRemovedStatus(IEnumerable<NotificationMessage> notifications)
        {
            if (notifications.Any())
            {
                var results = new List<SendNotificationResult>();
                foreach (var notification in notifications)
                {
                    var result = new SendNotificationResult
                    {
                        NotificationId = notification.NotificationId,
                        ConversationGroupId = notification.ConversationGroupId,
                        Status = SendNotificationStatus.Error,
                        ErrMsg = SendNotificationErrMsg.BotRemovedMsg
                    };
                    results.Add(result);
                }

                await UpdateRecipientStatus(results);
            }
        }

        private async Task SendNotification(IEnumerable<NotificationMessage> notifications)
        {
            var batches = DivideBatchToSend(notifications);
            foreach (var batch in batches)
            {
                var result = await SendMessage(batch);

                await UpdateRecipientStatus(result);
            }
        }

        private async Task<IEnumerable<SendNotificationResult>> SendMessage(List<NotificationMessage> notifications)
        {
            var tasks = new List<Task<SendNotificationResult>>();

            foreach (var notification in notifications)
            {
                tasks.Add(Task.Run(() => SendToLestalk(notification)));
            }

            var results = (await Task.WhenAll(tasks)).ToList();

            return results;
        }

        private async Task<SendNotificationResult> SendToLestalk(NotificationMessage notification)
        {
            var sendResult = new SendNotificationResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };
            try
            {
                if (notification.ChatType == ChatType.Personal)
                {
                    await SendToPersonal(notification, sendResult);
                }
                else
                {
                    await SendToGroup(notification, sendResult);
                }
            }
            catch (Exception exception)
            {
                sendResult.Status = SendNotificationStatus.Retrying;
                sendResult.ErrMsg = SendNotificationErrMsg.BotServiceErrorMsg;
                logService.LogFileError(exception);
                await WriteLogMessage(notification, new BaseResult { Status = 0, Message = exception.Message }, sendResult.Status);
                await logService.ErrorAsync(exception);
            }

            return sendResult;
        }

        private async Task SendToPersonal(NotificationMessage notification, SendNotificationResult sendResult)
        {
            var result = new PushMessageResult();

            var outGoingMsg = new OutgoingMessage
            {
                MessageType = MessageTypeNumber.Html,
                Text = notification.Content
            };

            result = await letstalkService(notification.BotId).PushPersonalAsync(new List<string> { notification.ConversationId }, outGoingMsg);

            if (!string.IsNullOrEmpty(notification.FileName))
            {
                await SendImagesToPersonal(notification);
            }

            await HandleSendPersonalResponse(notification, result, sendResult);
        }

        private async Task SendImagesToPersonal(NotificationMessage notification)
        {
            var images = notification.FileName.Split(",");
            logService.LogInformation("============== Personal ===========");
            logService.LogInformation($"AnnouncementID: {notification.AnnouncementId} - ConversationID: {notification.ConversationId}");
            foreach (var img in images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = MessageTypeNumber.Image,
                    ImageUrl = string.Format("{0}/{1}/{2}", BaseImageUrl, notification.AnnouncementId, img)
                };
                logService.LogInformation(string.Format("{0}/{1}/{2}", BaseImageUrl, notification.AnnouncementId, img));

                await letstalkService(notification.BotId).PushPersonalAsync(new List<string> { notification.ConversationId }, outgoingMsg);
            }
        }

        private async Task HandleSendPersonalResponse(NotificationMessage notification, PushMessageResult result, SendNotificationResult sendResult)
        {
            if (result.IsSuccess && !result.BlockList.Any())
            {
                sendResult.Status = SendNotificationStatus.Sent;
                sendResult.ErrMsg = string.Empty;
            }

            if (result.FailList.Any())
            {
                sendResult.Status = SendNotificationStatus.Error;
                sendResult.ErrMsg = SendNotificationErrMsg.LetstalkIdInvalidMsg;
            }

            if (result.BlockList.Any())
            {
                sendResult.Status = SendNotificationStatus.BotBlocked;
                sendResult.ErrMsg = string.Empty;
            }

            await WriteLogMessage(notification, result, sendResult.Status, result.BlockList.Any());
        }

        private async Task SendToGroup(NotificationMessage notification, SendNotificationResult sendResult)
        {
            try
            {
                var result = new PushMessageResult();
                var content = BuildContent(notification);
                var outGoingMsg = new OutgoingMessage
                {
                MessageType = MessageTypeNumber.Html,
                    Text = content
                };

                result = await letstalkService(notification.BotId).PushMultiRoomAsync(new List<string> { notification.ConversationId }, outGoingMsg);

            if (!string.IsNullOrEmpty(notification.FileName))
            {
                await SendImagesToGroup(notification);
            }

                sendResult.Status = result.IsSuccess ? SendNotificationStatus.Sent : SendNotificationStatus.Retrying;
                sendResult.ErrMsg = result.IsSuccess ? string.Empty : SendNotificationErrMsg.BotServiceErrorMsg;
                await WriteLogMessage(notification, result, sendResult.Status);
        }

        private async Task SendImagesToGroup(NotificationMessage notification)
        {
            var images = notification.FileName.Split(",");
            logService.LogInformation("============== Chat room ===========");
            logService.LogInformation($"AnnouncementID: {notification.AnnouncementId} - ConversationID: {notification.ConversationId}");
            foreach (var img in images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = MessageTypeNumber.Image,
                    ImageUrl = string.Format("{0}/{1}/{2}", BaseImageUrl, notification.AnnouncementId, img)
                };
                logService.LogInformation(string.Format("{0}/{1}/{2}", BaseImageUrl, notification.AnnouncementId, img));

                await letstalkService(notification.BotId).PushMultiRoomAsync(new List<string> { notification.ConversationId }, outgoingMsg);
            }
            }
            catch (Exception ex)
            {
                logService.LogFileError(ex);
                throw;
            }
        }

        private string BuildContent(NotificationMessage notification)
        {
            var content = notification.Content;
            if (!string.IsNullOrWhiteSpace(notification.FileName))
            {
                var files = notification.FileName.Split(",");
                foreach (var file in files)
                {
                    var strBuilder = new StringBuilder();
                    strBuilder.Append(content);
                    strBuilder.Append("<br />");
                    strBuilder.Append(imageUrl);
                    content = strBuilder.ToString();
                }
            }
            return content;
        }

        private string BuildImageBase64Html(string file, int announcementId)
        {
            var path = Path.Combine(webHostEnvironment.ContentRootPath, "wwwroot", "announcement", announcementId.ToString(), file);
            byte[] imageArray = File.ReadAllBytes(path);
            string fileType = file.EndsWith("png", StringComparison.OrdinalIgnoreCase) ? "png" : "jpeg";

            string base64ImageRepresentation = $"http://new-crm1.nexdev.net/www/dist/images/announcement/{announcementId}/{file}";
            var html = "<img style=\"width: 100%;\" src=\"" + base64ImageRepresentation + "\" Alt=\"" + file + "\">";
            return html;
        }

        private async Task UpdateRecipientStatus(IEnumerable<SendNotificationResult> sentResults)
        {
            var command = new UpdateNotificationStatusCommand
            {
                XmlData = sentResults.ToXML("root").ToString()
            };

            await baseService.ExecuteNonQueryAsync(command);
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
            return await baseService.GetDataAsync<NotificationMessage>(new GetNotificationToSendCriteria());
        }

        private async Task WriteLogMessage(NotificationMessage notification, BaseResult result, string status, bool isBlocked = false)
        {
            var errMsg = "Message= " + result.Message + "; " + "Status= " + status;
            var command = new WriteLogMessageCommand
            {
                NotificationId = notification.NotificationId,
                BotId = notification.BotId,
                Content = notification.Content,
                ConversationId = notification.ConversationId,
                IsSuccess = result.IsSuccess,
                IsBotBlocked = isBlocked,
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}