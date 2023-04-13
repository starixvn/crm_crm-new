namespace CRM.Services.BotServices
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using CRM.Models.BotServices;
    using CRM.Services.BotServices.Interfaces;
    using CRM.ViewModels.ChatTypeMapping;
    using Fanex.Caching;
    using Newtonsoft.Json;

    public class ChatBotService : IChatBotService
    {
        private readonly BotServiceSettings botSettings;
        private readonly IHttpClientFactory httpClientFactory;
        private readonly ICacheService cacheService;
        private const string JwtTokenCacheKey = "CRM_BotService_Authenticate_Token_Cache_Key";

        public ChatBotService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
        {
            this.botSettings = botSettings;
            this.httpClientFactory = httpClientFactory;
            this.cacheService = cacheService;
        }

        public async Task<IEnumerable<SendResult>> SendMultipleMessageAsync(IEnumerable<NotificationMessage> notifications)
        {
            var results = await PostAsync<IEnumerable<SendResult>>(ApiPath.SendMessageMultiplePath, notifications);
            return results;
        }

        public async Task<SendResult> SendMultipleMessageAsync(NotificationMessage notification)
        {
            var results = await PostAsync<SendResult>(ApiPath.SendSingleMessagePath, notification);
            return results;
        }

        public async Task<string> GetPersonalDisplayNameAsync(string botId, string letstalkId)
        {
            var data = new { BotId = botId, LetstalkId = letstalkId };
            var results = await PostAsync<string>(ApiPath.GetLetstalkDisplayName, data);
            return results;
        }

        public async Task<IEnumerable<RecipientLetstalk>> VerifyLetstalkAccountOnGroup(string botId, string conversationGroupId, List<string> letstalkIds)
        {
            var inputParams = new
            {
                BotId = botId,
                ConversationGroupId = conversationGroupId,
                LetstalkIds = letstalkIds
            };

            var results = await PostAsync<IEnumerable<RecipientLetstalk>>(ApiPath.VerifyUserOnGroupPath, inputParams);
            return results;
        }

        private async Task<T> PostAsync<T>(string url, object data)
        {
            var httpClient = httpClientFactory.CreateClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await GetTokenAsync());

            using (var response = await httpClient.PostAsJsonAsync($"{botSettings.ServiceUrl}{url}", data))
            {
                response.EnsureSuccessStatusCode();
                var responseData = await response.Content.ReadAsStringAsync();
                var results = JsonConvert.DeserializeObject<T>(responseData);
                return results;
            }
        }

        private async Task<string> GetTokenAsync()
        {
            string token = await cacheService.GetAsync<string>(JwtTokenCacheKey);
            if (token == null || !string.IsNullOrWhiteSpace(token))
            {
                var httpClient = httpClientFactory.CreateClient();
                using (var response = await httpClient.PostAsJsonAsync($"{botSettings.ServiceUrl}{ApiPath.AuthenticatePath}", new { botSettings.AppId, botSettings.Token }))
                {
                    response.EnsureSuccessStatusCode();
                    var responseData = await response.Content.ReadAsStringAsync();
                    token = JsonConvert.DeserializeObject<string>(responseData);

                    await cacheService.SetAsync(JwtTokenCacheKey, token);
                }
            }
            return token;
        }

        private static class ApiPath
        {
            internal const string AuthenticatePath = "api/authenticate";
            internal const string SendMessageMultiplePath = "api/authenticate";
            internal const string SendSingleMessagePath = "api/authenticate";
            internal const string GetLetstalkDisplayName = "api/letstalk/get-letstalk-name";
            internal const string VerifyUserOnGroupPath = "api/letstalk/verify-on-group";
        }
    }
}