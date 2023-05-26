namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using Fanex.Caching;

    public interface IChatBotSendMessageService
    {
        Task<IEnumerable<SendResult>> SendMultipleMessageAsync(BotChannel botChannel, IEnumerable<NotificationMessage> notifications);

        Task<SendResult> SendSingleMessageAsync(BotChannel botChannel, NotificationMessage notification);
    }

    public class ChatBotSendMessageService : BotServiceHttpClientBase, IChatBotSendMessageService
    {
        public ChatBotSendMessageService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
            : base(botSettings, httpClientFactory, cacheService)
        {
        }

        public async Task<IEnumerable<SendResult>> SendMultipleMessageAsync(BotChannel botChannel, IEnumerable<NotificationMessage> notifications)
        {
            var apiConfig = GetApiConfig(botChannel);
            var results = await PostAsync<IEnumerable<SendResult>>(apiConfig.SendMultipleMessagePath, notifications);
            return results;
        }

        public async Task<SendResult> SendSingleMessageAsync(BotChannel botChannel, NotificationMessage notification)
        {
            var apiConfig = GetApiConfig(botChannel);

            var results = await PostAsync<SendResult>(apiConfig.SendSingleMessagePath, notification);
            return results;
        }

        private ApiConfig GetApiConfig(BotChannel botChannel) =>
            botSettings.ApiConfigs.FirstOrDefault(x => x.Channel == botChannel) ?? throw new ArgumentException($"Missing config for bot service type {botChannel}");
    }
}