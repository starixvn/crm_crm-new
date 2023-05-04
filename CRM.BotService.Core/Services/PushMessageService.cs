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
        private readonly List<BotChannelInfo> channels;

        public PushMessageService(Func<long, ILetstalkClientService> letstalkClientService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService,
            ICRMLogService logService,
            List<BotChannelInfo> channels)
        {
            this.letstalkClientService = letstalkClientService;
            this.telegramBotService = telegramBotService;
            this.baseService = baseService;
            this.logService = logService;
            this.channels = channels;
        }

        public async Task<SendResult> PushAsync(NotificationMessage notification)
        {
            var result = new SendResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };

            if (!IsActiveChannel(notification.Channel))
            {
                result.ErrorCode = 1;
                result.ErrorMessage = $"Channel {notification.Channel} is current inactivated";
                result.IsIgnoreRetry = true;
                return result;
            }
            try
            {
                if (notification.Channel.Equals(BotChannel.Letstalk))
                {
                    await SendLetstalkAsync(notification, result);
                }
                if (notification.Channel.Equals(BotChannel.Telegram))
                {
                    await SendTelegramAsync(notification, result);
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
                await SendToPersonal(notification, result);
            }
            else
            {
                await SendToGroup(notification, result);
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

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToPersonal(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess && !sendResult.BlockList.Any() ? 0 : 1;
            result.IsBlockedBot = sendResult.BlockList.Count > 0;
            result.ErrorMessage = !sendResult.IsSuccess ? SendNotificationErrorMessage.LetstalkIdInvalid : string.Empty;
            await WriteLogMessage(notification, sendResult.IsSuccess, sendResult.BlockList.Any(), sendResult.Message);
        }

        private async Task SendToPersonalByTelegram(NotificationMessage notification, SendResult result)
        {
            notification.BotId = 6012438440;
            notification.ConversationId = "1292164636";
            var sendResult = await telegramBotService(notification.BotId).SendTextMessageAsync(notification);
            var logMesssage = new LogMessage("Send To Personal By Telegram Result: ")
                       .AddMessage(JsonConvert.SerializeObject(sendResult, Formatting.Indented))
                       .ToString();
            logService.LogInformation(logMesssage);
        }

        private async Task SendToGroupByTelegram(NotificationMessage notification, SendResult result)
        {
            notification.BotId = 6012438440;
            notification.ConversationId = "-1001894813845";
            var sendResult = await telegramBotService(notification.BotId).SendTextMessageAsync(notification);
            var logMesssage = new LogMessage("Send To Group By Telegram Result: ")
                       .AddMessage(JsonConvert.SerializeObject(sendResult, Formatting.Indented))
                       .ToString();
            logService.LogInformation(logMesssage);
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

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToGroup(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess ? 0 : 1;
            result.ErrorMessage = SendNotificationErrorMessage.BotServiceErrorMsg;

            await WriteLogMessage(notification, sendResult.IsSuccess, isBotBlocked: false, sendResult.Message);
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

        private async Task WriteLogMessage(NotificationMessage notification, bool isSuccess, bool isBotBlocked, string errMsg)
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

        #endregion Send message by Letstalk

        #region Send message by Telegram

        private async Task SendTelegramAsync(NotificationMessage notification, SendResult result)
        {
            //if (notification.ChatType == ChatType.Personal)
            //{
            //    await SendToPersonalByTelegram(notification, result);
            //}
            //else
            //{
            //    await SendToGroup(notification, result);
            //}
            await SendToPersonalByTelegram(notification, result);
            await SendToGroupByTelegram(notification, result);
        }

        #endregion Send message by Telegram

        public bool IsActiveChannel(BotChannel channel)
            => channels.Any(c => c.Name == channel && c.IsActive);
    }
}