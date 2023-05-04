namespace CRM.BotService.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Constants;
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
        private readonly HttpClient httpClient;
        private readonly IList<TelegramBotConfigurations> botConfigurations;
        private readonly ICRMLogService logService;

        public TelegramBotService(
            IHttpClientFactory httpClientFactory,
            List<TelegramBotConfigurations> botConfigurations,
            ICRMLogService logService)
        {
            this.botConfigurations = botConfigurations;
            this.logService = logService;
            httpClient = httpClientFactory.CreateClient(NamedHttpClients.ProxiedClient);

            foreach (var bot in botConfigurations)
            {
                bot.BotClient = new TelegramBotClient(bot.Token, httpClient);
            }
        }

        public async Task SetWebhookAsync(TelegramBotConfigurations bot)
        {
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


        public async Task<Message> SendTextMessageAsync(long botId, long chatId, string messageContent, ParseMode parseMode = ParseMode.Html)
        {
            TelegramBotConfigurations bot = botConfigurations.First(x => x.BotId == botId);
            var message = await bot.BotClient.SendTextMessageAsync(new ChatId(chatId), messageContent, parseMode);
            return message;
        }

        public async Task<SendMessageResult> SendTextMessageAsync(NotificationMessage notificationMessage)
        {
            try
            {
                _ = long.TryParse(notificationMessage.ConversationId, out long chatId);
                await SendTextMessageAsync(notificationMessage.BotId, chatId, notificationMessage.Content);
            }
            catch (Exception exception)
            {
                await WriteLogAsync(notificationMessage, exception);

                return GetSendMessageResult(notificationMessage, exception);
            }

            return new SendMessageResult
            {
                ConversationId = notificationMessage.ConversationId,
                NotificationId = notificationMessage.NotificationId,
                SentTime = DateTime.UtcNow
            };
        }

        protected internal virtual SendMessageResult GetSendMessageResult(NotificationMessage notificationMessage, Exception exception)
        {
            var result = new SendMessageResult
            {
                ConversationId = notificationMessage.ConversationId,
                NotificationId = notificationMessage.NotificationId,
                ErrorCode = 1,
                ErrorMessage = exception.Message,
                SentTime = DateTime.UtcNow
            };
            if (exception.Message.Contains("Message is too long", StringComparison.InvariantCultureIgnoreCase))
            {
                result.ErrorMessage = ErrorMessageTelegram.MessageIsTooLong;
                result.IsIgnoreRetry = true;
            }

            if (exception.Message.Contains("bot was kicked from the supergroup chat", StringComparison.InvariantCultureIgnoreCase)
                || exception.Message.Contains("bot was kicked from the group chat", StringComparison.InvariantCultureIgnoreCase)
                || exception.Message.Contains("chat not found", StringComparison.InvariantCultureIgnoreCase))
            {
                result.ErrorMessage = ErrorMessageTelegram.GroupChatDeleted;
                result.IsIgnoreRetry = true;
            }

            if(exception.Message.Contains("bot was blocked by the user", StringComparison.InvariantCultureIgnoreCase))
            {
                result.ErrorMessage = ErrorMessageTelegram.BlockBot;
                result.IsIgnoreRetry = true;
            }

            return result;
        }

        protected internal virtual async Task WriteLogAsync(NotificationMessage notificationMessage, Exception exception)
        {
            var param = new Dictionary<string, object>
            {
                { "notificationId", notificationMessage.NotificationId },
                { "botId", notificationMessage.BotId },
                { "chatId", notificationMessage.ConversationId },
                { "messageContent", notificationMessage.Content }
            };
            var logMessage = new LogMessage(exception.Message)
                .AddSection("Database Info", DatabaseInfoGetters.GetDbExceptionInfo(exception))
                .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
                .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
                .AddSection("Params", param);

            await logService.ErrorMessageAsync(logMessage.ToString());
        }
    }
}