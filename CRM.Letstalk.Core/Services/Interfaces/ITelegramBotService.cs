namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using Telegram.Bot.Types;
    using Telegram.Bot.Types.Enums;

    public interface ITelegramBotService
    {
        Task SetWebhookAsync(string url);

        Task<User> GetBotInfoAsync(long botId);

        Task<Message> SendTextMessageAsync(long botId, long chatId, string messageContent, ParseMode parseMode = ParseMode.Html);

        Task<SendMessageResult> SendTextMessageAsync(ConversationInfo conversationInfo);
    }
}