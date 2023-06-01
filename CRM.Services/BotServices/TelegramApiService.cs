namespace CRM.Services.BotServices
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using CRM.Models.ChatTypeMapping;
    using CRM.Services.BotServices.Interfaces;
    using Fanex.Caching;

    public class TelegramApiService : BotServiceHttpClientBase, ITelegramApiService
    {
        public TelegramApiService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
            : base(botSettings, httpClientFactory, cacheService)
        {
        }

        public async Task<LetstalkTelegramContact> GetPersonalDisplayNameAsync(long botId, long chatId)
        {
            var data = new { BotId = botId, ChatId = chatId };
            var results = await PostAsync<LetstalkTelegramContact>(ApiPath.GetTelegramUserProfilePath, data);
            if (results is not null)
            {
                results.DisplayName = results.FirstName + " " + results.LastName;
            }
            return results;
        }

        public async Task<LetstalkTelegramContact> GetGroupDisplayNameAsync(long botId, long chatId)
        {
            var data = new { BotId = botId, ChatId = chatId };
            var results = await PostAsync<LetstalkTelegramContact>(ApiPath.GetTelegramUserProfilePath, data);
            return results;
        }
        

        private static class ApiPath
        {
            internal const string GetTelegramUserProfilePath = "api/telegram/bot/get-profile";
        }
    }
}