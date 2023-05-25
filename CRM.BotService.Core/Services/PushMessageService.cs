namespace CRM.BotService.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Fanex.Logging.Extensions;
    using Newtonsoft.Json;

    public class PushMessageService : IPushMessageService

    {
        private readonly Func<long, ILetstalkClientService> letstalkClientService;
        private readonly Func<long, ITelegramBotService> telegramBotService;
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly List<BotChannelInfo> botChannelInfos;

        public PushMessageService(Func<long, ILetstalkClientService> letstalkClientService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService,
            ICRMLogService logService,
            List<BotChannelInfo> botChannelInfos)
        {
            this.letstalkClientService = letstalkClientService;
            this.telegramBotService = telegramBotService;
            this.baseService = baseService;
            this.logService = logService;
            this.botChannelInfos = botChannelInfos;
        }

        public async Task<SendResult> PushAsync(NotificationMessage notification)
        {
            var result = new SendResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };

            if (!IsActiveChannel(notification.ChannelId))
            {
                result.SentTime = DateTime.UtcNow;
                result.ErrorCode = 1;
                result.ErrorMessage = $"Channel {notification.ChannelId} is current inactivated";
                result.IsIgnoreRetry = true;
                return result;
            }
            try
            {
                if (notification.ChannelId.Equals(BotChannel.Letstalk))
                {
                    await SendLetstalkAsync(notification, result);
                }
                if (notification.ChannelId.Equals(BotChannel.Telegram))
                {
                    await SendTelegramAysnc(notification, result);
                }
            }
            catch (Exception ex)
            {
                result.ErrorCode = 1;
                result.SentTime = DateTime.UtcNow;
                result.ErrorMessage = SendNotificationErrorMessage.BotServiceErrorMsg;
                await WriteLogMessage(notification, isSuccess: false, isBotBlocked: false, errMsg: ex.Message);
                await logService.ErrorAsync(ex);
            }

            return result;
        }

        #region Send message by Letstalk

        private async Task SendLetstalkAsync(NotificationMessage notification, SendResult result)
        {
            if (notification.ChatType == ChatType.Personal)
            {
                await SendLetstalkPersonal(notification, result);
            }
            else
            {
                await SendLetstalkGroup(notification, result);
            }
        }

        protected internal virtual async Task SendLetstalkPersonal(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = notification.MessageType,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushPersonalAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToPersonal(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess && !sendResult.BlockList.Any() ? 0 : 1;
            result.IsBlockedBot = sendResult.BlockList.Any(x => x.Equals(notification.ConversationId, StringComparison.CurrentCultureIgnoreCase));
            result.ErrorMessage = !sendResult.IsSuccess &&
                sendResult.FailList.Any(x => x.Equals(notification.ConversationId, StringComparison.CurrentCultureIgnoreCase))
                ? SendNotificationErrorMessage.LetstalkIdInvalid
                : string.Empty;
            await WriteLogMessage(notification, sendResult.IsSuccess, sendResult.BlockList.Any(), sendResult.Message);
        }

        protected internal virtual async Task SendImagesToPersonal(NotificationMessage notification)
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

        protected internal virtual async Task SendLetstalkGroup(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = notification.MessageType,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushRoomAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToGroup(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess ? 0 : 1;
            result.ErrorMessage = !sendResult.IsSuccess ? SendNotificationErrorMessage.BotServiceErrorMsg : string.Empty;

            await WriteLogMessage(notification, sendResult.IsSuccess, isBotBlocked: false, sendResult.Message);
        }

        protected internal virtual async Task SendImagesToGroup(NotificationMessage notification)
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

        #endregion Send message by Letstalk

        #region Send message by Telegram

        protected internal virtual async Task SendTelegramAysnc(NotificationMessage notification, SendResult sendResult)
        {
            await telegramBotService(notification.BotId).SendTextMessageAsync(notification, sendResult);
            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccessful)
            {
                await telegramBotService(notification.BotId).SendImageAsync(notification, sendResult);
            }
            sendResult.SentTime = DateTime.UtcNow;
            var errMessage = sendResult.IsSuccessful ? string.Empty : sendResult.ErrorMessage;
            await WriteLogMessage(notification, sendResult.IsSuccessful, sendResult.IsBlockedBot, errMessage);
        }

        #endregion Send message by Telegram

        protected internal virtual bool IsActiveChannel(BotChannel channel)
            => botChannelInfos.Any(c => c.Name == channel && c.IsActive);

        protected internal virtual async Task WriteLogMessage(NotificationMessage notification, bool isSuccess, bool isBotBlocked, string errMsg)
        {
            var command = new WriteLogMessageCommand
            {
                NotificationId = notification.NotificationId,
                BotId = notification.BotId,
                Content = notification.Content,
                ConversationId = notification.ConversationId,
                IsSuccess = isSuccess,
                IsBotBlocked = isBotBlocked,
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}