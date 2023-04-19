namespace CRM.BotService.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.Results;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Newtonsoft.Json;

    public class PushMessageService : IPushMessageService
    {
        private readonly Func<int, ILetstalkClientService> letstalkClientService;
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly List<BotChannelInfo> channels;

        public PushMessageService(Func<int, ILetstalkClientService> letstalkClientService,
            IBaseService baseService,
            ICRMLogService logService,
            List<BotChannelInfo> channels)
        {
            this.letstalkClientService = letstalkClientService;
            this.baseService = baseService;
            this.logService = logService;
            this.channels = channels;
        }

        public async Task<SendResult> PushAsync(NotificationMessage notification)
        {
            var result = new SendResult
            {
                Channel = notification.Channel,
                NotificationId = notification.NotificationId,
                ConversationId = notification.ConversationId,
            };

            if (!IsActiveChannel(notification.Channel))
            {
                result.ErrorCode = 1;
                result.ErrorMessage = $"Channel {notification.Channel} is current inactivated";
                result.IsIgnoreRetry = true;
                return result;
            }

            if (notification.Channel.Equals(BotChannel.Letstalk))
            {
                await SendLetstalkAsync(notification, result);
            }

            return result;
        }

        #region Send message by Letstalk

        private async Task SendLetstalkAsync(NotificationMessage notification, SendResult result)
        {
            try
            {
                if (notification.ChatType == ChatType.Personal)
                {
                    await SendToPersonal(notification, result);
                }
                else
                {
                    await SendToGroup(notification, result);
                }
            }
            catch (Exception exception)
            {
                result.SentTime = DateTime.UtcNow;
                result.ErrorCode = 1;
                result.ErrorMessage = exception.Message;
                await WriteLogMessage(notification, new PushMessageResult { Status = 0, Message = exception.Message });
            }
        }

        private async Task SendToPersonal(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = notification.MessageType,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushPersonalAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0)
            {
                await SendImagesToPersonal(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess && !sendResult.BlockList.Any() ? 0 : 1;
            result.IsBlockedBot = sendResult.BlockList.Count > 0;
            result.ErrorMessage = sendResult.Message;
        }

        private async Task SendImagesToPersonal(NotificationMessage notification)
        {
            foreach (var img in notification.Images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = NotificationMessageType.Image,
                    ImageUrl = img
                };

                var result = await letstalkClientService(notification.BotId).PushPersonalAsync(notification.ConversationId, outgoingMsg);
                logService.LogInformation(JsonConvert.SerializeObject(new
                {
                    notification.NotificationId,
                    notification.BotId,
                    notification.ConversationId,
                    ImageUrl = img,
                    Result = result
                }));
            }
        }

        private async Task SendToGroup(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = NotificationMessageType.Html,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushRoomAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0)
            {
                await SendImagesToGroup(notification);
            }

            await WriteLogMessage(notification, sendResult);

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess ? 0 : 1;
            result.ErrorMessage = sendResult.Message;
        }

        private async Task SendImagesToGroup(NotificationMessage notification)
        {
            foreach (var img in notification.Images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = NotificationMessageType.Image,
                    ImageUrl = img
                };

                var result = await letstalkClientService(notification.BotId).PushRoomAsync(notification.ConversationId, outgoingMsg);
                logService.LogInformation(JsonConvert.SerializeObject(new
                {
                    notification.NotificationId,
                    notification.BotId,
                    notification.ConversationId,
                    ImageUrl = img,
                    Result = result
                }));
            }
        }

        private async Task WriteLogMessage(NotificationMessage notification, PushMessageResult sendResult)
        {
            var errMsg = "Message= " + sendResult.Message + "; " + "Status= " + sendResult.Message;
            var command = new WriteLogMessageCommand
            {
                Channel = notification.Channel.ToString(),
                NotificationId = notification.NotificationId,
                BotId = notification.BotId,
                Content = notification.Content,
                ConversationId = notification.ConversationId,
                IsSuccess = sendResult.IsSuccess,
                IsBotBlocked = sendResult.BlockList.Any(),
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }

        #endregion Send message by Letstalk

        public bool IsActiveChannel(CRM.Core.Enumerables.BotChannel channel)
            => channels.Any(c => c.Name == channel && c.IsActive);
    }
}