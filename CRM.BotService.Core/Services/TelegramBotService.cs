namespace CRM.BotService.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.Database;
    using Telegram.Bot;
    using Telegram.Bot.Types;
    using Telegram.Bot.Types.Enums;

    public class TelegramBotService : ITelegramBotService
    {
        private readonly IList<TelegramBotConfigurations> botConfigurations;
        private readonly ICRMLogService logService;
        private readonly IBotCommonService botCommonService;

        public TelegramBotService(
            IHttpClientFactory clientFactory,
            List<TelegramBotConfigurations> botConfigurations,
            ICRMLogService logService,
            IBotCommonService botCommonService)
        {
            this.botConfigurations = botConfigurations;
            this.logService = logService;
            this.botCommonService = botCommonService;
            var httpClient = clientFactory.CreateClient(NamedHttpClients.ProxiedClient);
            foreach (var bot in botConfigurations)
            {
                bot.BotClient = new TelegramBotClient(bot.Token, httpClient);
            }
        }

        public async Task SetWebhookAsync(TelegramBotConfigurations bot)
        {
            ValidateInputParam(nameof(bot.Domain), bot.Domain);
            var webhook = $"{bot.Domain}api/telegram/webhook/{bot.BotId}/update";
            await bot.BotClient.DeleteWebhookAsync();
            await bot.BotClient.SetWebhookAsync(webhook);
        }

        public async Task<User> GetBotInfoAsync(long botId)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            return await bot.BotClient.GetMeAsync();
        }

        public async Task<WebhookInfo> GetWebhookInfoAsync(TelegramBotConfigurations bot)
        {
            return await bot.BotClient.GetWebhookInfoAsync();
        }

        public async Task<Chat> GetChatAsync(long botId, long chatId)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            var chat = await bot.BotClient.GetChatAsync(new ChatId(chatId));
            return chat;
        }

        public async Task<ChatMember> GetChatMemberAsync(long botId, long chatGroupId, long chatMemberId)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            var chatMember = await bot.BotClient.GetChatMemberAsync(new ChatId(chatGroupId), chatMemberId);
            return chatMember;
        }

        public async Task SendNotifyAysnc(NotificationMessage notificationMessage, SendResult sendResult)
        {
            logService.LogInformation("Start SendNotifyAysnc: " + notificationMessage.ConversationId);
            await SendTextMessageAsync(notificationMessage, sendResult);
            if (notificationMessage.Images is not null && notificationMessage.Images.Length > 0 && sendResult.IsSuccessful)
            {
                await SendImageAsync(notificationMessage, sendResult);
            }
            sendResult.SentTime = DateTime.UtcNow;
            await WriteLogCommandAsync(notificationMessage, sendResult);
            logService.LogInformation("End SendNotifyAysnc: " + notificationMessage.ConversationId);
        }

        public async Task SendTextMessageAsync(NotificationMessage notificationMessage, SendResult sendResult)
        {
            try
            {
                _ = long.TryParse(notificationMessage.ConversationId, out long chatId);
                ValidateInputParam(nameof(notificationMessage.Content), notificationMessage.Content);
                var result = await SendTextMessageAsync(notificationMessage.BotId, chatId, notificationMessage.Content);
                if (result is not null)
                {
                    sendResult.ErrorCode = 0;
                }
            }
            catch (Exception exception)
            {
                WriteLogInfor(notificationMessage, exception);
                HandleExptionTelegramMessage(sendResult, exception);
            }
        }

        public async Task<Message> SendTextMessageAsync(long botId, long chatId, string messageContent, ParseMode parseMode = ParseMode.Html)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            ValidateInputParam(nameof(messageContent), messageContent);
            var message = await bot.BotClient.SendTextMessageAsync(new ChatId(chatId), messageContent, parseMode);
            return message;
        }

        public async Task SendImageAsync(NotificationMessage notificationMessage, SendResult sendResult)
        {
            try
            {
                sendResult.ErrorCode = 0;
                _ = long.TryParse(notificationMessage.ConversationId, out long chatId);
                foreach (var img in notificationMessage.Images)
                {
                    logService.LogInformation("Start SendImageAsync: " + notificationMessage.ConversationId + img);

                    await SendImageAsync(notificationMessage.BotId, chatId, img);
                    await WriteLogCommandAsync(notificationMessage, sendResult, img);
                }
                logService.LogInformation("End SendImageAsync: " + notificationMessage.ConversationId);
            }
            catch (Exception exception)
            {
                WriteLogInfor(notificationMessage, exception);
                HandleExptionTelegramMessage(sendResult, exception);
            }
        }

        public async Task<Message> SendImageAsync(long botId, long chatId, string urlImage)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            var photo = new Telegram.Bot.Types.InputFiles.InputOnlineFile(urlImage);
            Message message = await bot.BotClient.SendPhotoAsync(
                chatId: chatId,
                photo: photo);
            return message;
        }

        public async Task WriteLogCommandAsync(NotificationMessage notificationMessage, SendResult sendResult, string image = "")
        {
            var writeLogCommand = new WriteLogMessageCommand
            {
                BotId = notificationMessage.BotId,
                ConversationId = notificationMessage.ConversationId,
                Content = string.IsNullOrEmpty(image) ? notificationMessage.Content : image,
                IsSuccess = sendResult.IsSuccessful,
                IsBotBlocked = sendResult.IsBlockedBot,
                ErrMsg = sendResult.IsSuccessful ? string.Empty : sendResult.ErrorMessage
            };
            await botCommonService.WriteLogMessageAsyns(writeLogCommand);
        }

        private static void HandleExptionTelegramMessage(SendResult sendResult, Exception exception)
        {
            sendResult.ErrorCode = 1;
            sendResult.ErrorMessage = exception.Message;

            if (exception.Message.Contains("Message is too long", StringComparison.InvariantCultureIgnoreCase))
            {
                sendResult.ErrorMessage = ErrorMessageTelegram.MessageIsTooLong;
                sendResult.IsIgnoreRetry = true;
            }

            if (exception.Message.Contains("bot was kicked from the supergroup chat", StringComparison.InvariantCultureIgnoreCase)
                || exception.Message.Contains("bot was kicked from the group chat", StringComparison.InvariantCultureIgnoreCase)
                || exception.Message.Contains("chat not found", StringComparison.InvariantCultureIgnoreCase))
            {
                sendResult.ErrorMessage = ErrorMessageTelegram.GroupChatDeleted;
                sendResult.IsIgnoreRetry = true;
            }

            if (exception.Message.Contains("bot was blocked by the user", StringComparison.InvariantCultureIgnoreCase))
            {
                sendResult.ErrorMessage = ErrorMessageTelegram.BlockBot;
                sendResult.IsIgnoreRetry = true;
                sendResult.IsBlockedBot = true;
            }
        }

        public void WriteLogInfor(NotificationMessage notificationMessage, Exception exception)
        {
            var param = new Dictionary<string, object>
            {
                { "notificationId", notificationMessage.NotificationId },
                { "botId", notificationMessage.BotId },
                { "chatId", notificationMessage.ConversationId }
            };
            var logMessage = new LogMessage(exception.Message)
                .AddSection("Database Info", DatabaseInfoGetters.GetDbExceptionInfo(exception))
                .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
                .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
                .AddSection("Params", param);

            logService.LogInformation(logMessage.ToString());
        }

        private static void ValidateInputParam(string paramName, object paramValue)
        {
            if (paramValue == null
                || (paramValue is string && string.IsNullOrWhiteSpace(paramValue as string)))
            {
                throw new ArgumentNullException(paramName);
            }
        }
    }
}