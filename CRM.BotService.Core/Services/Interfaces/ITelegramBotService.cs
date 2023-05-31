namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.Core.Models.BotServices;
    using Telegram.Bot.Types;
    using Telegram.Bot.Types.Enums;

    public interface ITelegramBotService
    {
        Task SetWebhookAsync(TelegramBotConfigurations bot);

        Task<WebhookInfo> GetWebhookInfoAsync(TelegramBotConfigurations bot);

        Task<User> GetBotInfoAsync(long botId);

        Task<Chat> GetChatAsync(long botId, long chatId);

        Task<Message> SendTextMessageAsync(long botId, long chatId, string messageContent, ParseMode parseMode = ParseMode.Html);

        Task<Message> SendImageAsync(long botId, long chatId, string urlImage);

        Task SendNotifyAysnc(NotificationMessage notificationMessage, SendResult sendResult);
    }
}