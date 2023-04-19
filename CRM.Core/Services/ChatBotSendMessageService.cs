namespace CRM.Core.Services
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Models.BotServices;
    using Fanex.Caching;

    public interface IChatBotSendMessageService
    {
        Task<IEnumerable<SendResult>> SendMultipleMessageAsync(IEnumerable<NotificationMessage> notifications);

        Task<SendResult> SendSingleMessageAsync(NotificationMessage notification);
    }

    public class ChatBotSendMessageService : BotServiceHttpClientBase, IChatBotSendMessageService
    {
        public ChatBotSendMessageService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
            : base(botSettings, httpClientFactory, cacheService)
        {
        }

        public async Task<IEnumerable<SendResult>> SendMultipleMessageAsync(IEnumerable<NotificationMessage> notifications)
        {
            var results = await PostAsync<IEnumerable<SendResult>>(ApiPath.SendMessageMultiplePath, notifications);
            return results;
        }

        public async Task<SendResult> SendSingleMessageAsync(NotificationMessage notification)
        {
            var results = await PostAsync<SendResult>(ApiPath.SendSingleMessagePath, notification);
            return results;
        }

        private static class ApiPath
        {
            internal const string SendMessageMultiplePath = "api/multiple-notify";
            internal const string SendSingleMessagePath = "api/single-notify";
        }
    }
}