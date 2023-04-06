namespace CRM.BotService.Services.Letstalk.Services
{
    using System.Text;
    using CRM.BotService.Services.Letstalk.Configurations;
    using CRM.BotService.Services.Letstalk.Helpers;
    using CRM.BotService.Services.Letstalk.Services.Interfaces;
    using CRM.BotService.Services.Models;
    using CRM.BotService.Services.Models.Results;
    using Fanex.Caching;
    using Newtonsoft.Json;

    public class LetstalkClientService : ILetstalkClientService
    {
        private const string LetstalkCacheKey = "CRM-Letstalk-API-Token";
        private const string JsonContentType = "application/json";
        private const string PlainTextContentType = "text/plain";
        private const int ExpiredTokenPeriodInMiliseconds = 5000;
        private readonly LetstalkBotConfig botConfig;
        private readonly IHttpClientService httpClientService;
        private readonly ICacheService cacheService;

        public LetstalkClientService(IHttpClientService httpClientService,
            ICacheService cacheService,
            LetstalkBotConfig botConfig)
        {
            this.cacheService = cacheService;
            this.httpClientService = httpClientService;
            this.botConfig = botConfig;
        }

        public async Task<BaseResult> ChangeDisplayNameAsync(string botName)
        {
            ValidateInputParam(nameof(botName), botName);

            return await httpClientService.ExecutePutAsync<BaseResult>(
                GetActualEndpoint($"bot/change_display_name/{botConfig.BotAccountId}"),
                PlainTextContentType,
                Encode(new Dictionary<string, object>
                {
                    { "display_name", botName }
                }),
                Base64ApiKeyEncoded()
                );
        }

        public async Task<IList<string>> GetBotContactList()
        {
            var result = await httpClientService.ExecuteGetAsync<BotContactListResult>(
                GetActualEndpoint($"bot/v2/contact?botId={botConfig.BotAccountId}"),
                PlainTextContentType);
            if (result.IsSuccess)
            {
                return result.Contacts;
            }

            return new List<string>();
        }

        public async Task<RoomData> GetChatRoomData(string chatRoomId)
        {
            ValidateInputParam(nameof(chatRoomId), chatRoomId);

            var result = await httpClientService.ExecuteGetAsync<RoomResult>(GetActualEndpoint($"bot/v2/chatroom/data?botId={botConfig.BotAccountId}&room={chatRoomId}"), PlainTextContentType);

            if (result.IsSuccess)
            {
                return result.Room;
            }

            return null;
        }

        public async Task<(Contact, bool)> GetProfileAsync(string accountId)
        {
            ValidateInputParam(nameof(accountId), accountId);

            var result = await httpClientService.ExecuteGetAsync<ProfileResult>(GetActualEndpoint($"bot/get_profile/{botConfig.BotAccountId}/user/{accountId}"), PlainTextContentType);

            if (result != null && result.IsSuccess)
            {
                return (new Contact
                {
                    UserId = accountId,
                    AvatarUrl = result.AvatarUrl,
                    DisplayName = result.DisplayName
                }, true);
            }

            return (new Contact(), false);
        }

        public async Task<PushMessageResult> PushRoomAsync(string roomId, OutgoingMessage message)
            => await PushRoomAsync(new List<string> { roomId }, message);

        public async Task<PushMessageResult> PushRoomAsync(IEnumerable<string> roomList, OutgoingMessage message)
        {
            ValidateInputParam(nameof(roomList), roomList);
            ValidateInputParam(nameof(message), message);
            ValidateMultiCastMessage(message);

            var token = await GetSignAccessTokenAsync();
            var result = await httpClientService.ExecutePostAsync<PushMessageResult>(
                GetActualEndpoint($"bot/v3/message/multi-chatroom"),
                JsonContentType,
                JsonConvert.SerializeObject(
                new Dictionary<string, object>
                {
                    { "msg", message },
                    { "receivers", roomList }
                }),
                token);

            return result;
        }

        private static void ValidateMultiCastMessage(OutgoingMessage message)
        {
            if (message.MessageType == MessageTypeNumber.Text && string.IsNullOrWhiteSpace(message.Text))
            {
                throw new ArgumentNullException(message.Text);
            }

            if ((message.MessageType == MessageTypeNumber.Image && message.MessageType == MessageTypeNumber.FullImage)
                && string.IsNullOrWhiteSpace(message.ImageUrl))
            {
                throw new ArgumentNullException(message.ImageUrl);
            }
        }

        private async Task<string> GetSignAccessTokenAsync()
        {
            var token = await cacheService.GetAsync<string>(LetstalkCacheKey);

            if (string.IsNullOrWhiteSpace(token))
            {
                var result = await httpClientService.ExecutePostAsync<TokenResult>(
                      GetActualEndpoint($"bot/v3/sign-token"),
                      JsonContentType,
                      JsonConvert.SerializeObject(
                      new Dictionary<string, object>
                      {
                            { "id", botConfig.BotAccountId },
                            { "token", botConfig.ApiKey }
                      }));

                token = result.Token;
                await cacheService.SetAsync(
                    LetstalkCacheKey,
                    token,
                    new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(5)));
            }

            return token;
        }

        public async Task<BaseResult> SetWebhookAsync(string url)
        {
            ValidateInputParam(nameof(url), url);
            return await httpClientService.ExecutePostAsync<BaseResult>(
                GetActualEndpoint($"bot/set_webhook/{botConfig.BotAccountId}"),
                PlainTextContentType,
                Encode(
                new Dictionary<string, object>
                {
                    { "url", url }
                }),
                Base64ApiKeyEncoded());
        }

        private static void ValidateInputParam(string paramName, object paramValue)
        {
            if (paramValue == null
                || (paramValue is string && string.IsNullOrWhiteSpace(paramValue as string)))
            {
                throw new ArgumentNullException(paramName);
            }
        }

        public async Task<IList<string>> GetChatRoomList()
        {
            var result = await httpClientService.ExecuteGetAsync<BotChatRoomListResult>(
                    GetActualEndpoint($"bot/v2/chatroom?botId={botConfig.BotAccountId}"),
                    PlainTextContentType,
                    token: Base64ApiKeyEncoded()
                    );
            if (result.IsSuccess)
            {
                return result.Rooms;
            }

            return new List<string>();
        }

        public async Task<string> GetWebhookAsync()
        {
            var result = await httpClientService.ExecuteGetAsync<WebhookResult>(
                GetActualEndpoint($"bot/get_webhook/{botConfig.BotAccountId}"), PlainTextContentType, token: Base64ApiKeyEncoded());

            if (result.IsSuccess)
            {
                return result.Url;
            }

            return string.Empty;
        }

        public async Task<PushMessageResult> PushPersonalAsync(string letstalkId, OutgoingMessage message, bool isForcePush = true)
            => await PushPersonalAsync(new List<string> { letstalkId }, message, isForcePush);

        public async Task<PushMessageResult> PushPersonalAsync(IEnumerable<string> accountIds, OutgoingMessage message, bool isForcePush = true)
        {
            ValidateInputParam(nameof(accountIds), accountIds);
            ValidateInputParam(nameof(message), message);
            ValidateMultiCastMessage(message);

            var token = await GetSignAccessTokenAsync();
            var result = await httpClientService.ExecutePostAsync<PushMessageResult>(
                GetActualEndpoint($"bot/v3/message/multicast"),
                JsonContentType,
                JsonConvert.SerializeObject(
                new Dictionary<string, object>
                {
                    { "msg", message },
                    { "receivers", accountIds.ToArray() },
                    { "forcePush", isForcePush ? 1 : 0 }
                }),
                token
                );

            return result;
        }

        private string Encode(IDictionary<string, object> data)
        {
            var totalMilisecondNow = DateTimeOffset.Now.ToUnixTimeMilliseconds();

            data.Add("iat", totalMilisecondNow);
            data.Add("exp", totalMilisecondNow + ExpiredTokenPeriodInMiliseconds);

            var result = JwtHelper.Encode(botConfig.SecureKey, data);
            return result;
        }

        private string Base64ApiKeyEncoded()
            => Convert.ToBase64String(Encoding.UTF8.GetBytes(botConfig.ApiKey));

        private string GetActualEndpoint(string endpoint) => botConfig.ApiEndpoint + endpoint;
    }
}