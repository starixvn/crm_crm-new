namespace CRM.Services.BotServices
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Models.BotServices;
    using CRM.Models.ChatTypeMapping;
    using CRM.Services.BotServices.Interfaces;
    using CRM.ViewModels.ChatTypeMapping;
    using Fanex.Caching;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

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

        public async Task<LetstalkContact> GetPersonalDisplayNameAsync(int botId, string letstalkId)
        {
            var data = new { BotId = botId, LetstalkId = letstalkId };
            var results = await PostAsync<LetstalkContact>(ApiPath.GetLetstalkUserProfilePath, data);
            return results;
        }

        public async Task<LetsalkValidationModel> VerifyLetstalkOnGroup(int botId, string conversationGroupId, List<RecipientLetstalk> letstalkRecipients)
        {
            var letstalkIds = GetLetstalkIdList(letstalkRecipients);
            var inputParams = new
            {
                BotId = botId,
                ConversationGroupId = conversationGroupId,
                LetstalkIds = letstalkIds
            };

            var results = await PostAsync<LetsalkValidationModel>(ApiPath.VerifyUserOnGroupPath, inputParams);

            return results;
        }

        private static List<string> GetLetstalkIdList(List<RecipientLetstalk> letstalkRecipients)
        {
            var letstalkIds = new List<string>();
            foreach (var item in letstalkRecipients)
            {
                foreach (var letstalk in item.Letstalks)
                {
                    letstalkIds.Add(letstalk.LetstalkId.Trim());
                }
            }

            return letstalkIds;
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
            if (token == null || string.IsNullOrWhiteSpace(token))
            {
                var authData = new
                {
                    botSettings.AppId,
                    Token = Convert.ToBase64String(Encoding.UTF8.GetBytes(botSettings.Token))
                };
                var httpClient = httpClientFactory.CreateClient();
                using (var response = await httpClient.PostAsJsonAsync($"{botSettings.ServiceUrl}{ApiPath.AuthenticatePath}", authData))
                {
                    response.EnsureSuccessStatusCode();
                    var responseString = await response.Content.ReadAsStringAsync();
                    var data = JObject.Parse(responseString);
                    token = data["accessToken"].Value<string>();
                    DateTime expired = (data["expriedDate"].Value<DateTime>());
                    await cacheService.SetAsync(JwtTokenCacheKey, token, new CacheItemOptions
                    {
                        AbsoluteExpiration = expired
                    });
                }
            }
            return token;
        }

        private static class ApiPath
        {
            internal const string AuthenticatePath = "api/authenticate";
            internal const string SendMessageMultiplePath = "api/multiple-notify";
            internal const string SendSingleMessagePath = "api/single-notify";
            internal const string GetLetstalkUserProfilePath = "api/letstalk/get-user-profile";
            internal const string VerifyUserOnGroupPath = "api/letstalk/verify-on-group";
        }
    }
}