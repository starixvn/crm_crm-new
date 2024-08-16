namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Models.BotServices.Announcement;
    using Fanex.Caching;

    public interface IChatBotSendMessageService
    {
        Task<IEnumerable<SendNotificationResult>> SendMultipleFormattedMessageAndAttachmentAsync(BotChannel botChannel, IEnumerable<AnnouncementNotification> notifications);

        Task<IEnumerable<SendNotificationResult>> SendImageOnlyAsync(BotChannel botChannel, IEnumerable<AnnouncementNotification> notifications);
    }

    public class ChatBotSendMessageService : BotServiceHttpClientBase, IChatBotSendMessageService
    {
        public ChatBotSendMessageService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
            : base(botSettings, httpClientFactory, cacheService)
        {
        }

        public async Task<IEnumerable<SendNotificationResult>> SendMultipleFormattedMessageAndAttachmentAsync(BotChannel botChannel, IEnumerable<AnnouncementNotification> notifications)
        {
            var apiConfig = GetApiConfig(botChannel);
            var results = await PostAsync<IEnumerable<SendNotificationResult>>(apiConfig.SendMultipleAnnouncementPath, notifications);
            return results;
        }

        public async Task<IEnumerable<SendNotificationResult>> SendImageOnlyAsync(BotChannel botChannel, IEnumerable<AnnouncementNotification> notifications)
        {
            var apiConfig = GetApiConfig(botChannel);
            var results = await PostAsync<IEnumerable<SendNotificationResult>>(apiConfig.SendOnlyImagesMultiplePath, notifications);
            return results;
        }

        private ApiConfig GetApiConfig(BotChannel botChannel) =>
            botSettings.ApiConfigs.Find(x => x.Channel == botChannel) ?? throw new ArgumentException($"Missing config for bot service type {botChannel}");
    }
}