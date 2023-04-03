namespace CRM.Letstalk.Core.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Letstalk.Core.Models;
    using Telegram.Bot.Types;
    using Telegram.Bot.Types.Enums;
    public interface ITelegramBotService
    {
        Task SetWebhookAsync();

        Task<User> GetBotInfoAsync(long botId);

        Task<Message> SendTextMessageAsync(long botId, long chatId, string messageContent, ParseMode parseMode = ParseMode.Html);

        Task<SendMessageResult> SendTextMessageAsync(ConversationInfo conversationInfo);
    }
}
