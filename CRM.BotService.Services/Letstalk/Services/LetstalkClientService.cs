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
    using Newtonsoft.Json.Serialization;

    public class LetstalkClientService : ILetstalkClientService
    {
        private const int payloadId = 100;
        private const string LetstalkCacheKey = "CRM-Letstalk-API-Token";
        private const string JsonContentType = "application/json";
        private const string PlainTextContentType = "text/plain";
        private const int ExpiredTokenPeriodInMiliseconds = 5000;
        private readonly LetstalkBotConfig botConfig;
        private readonly IHttpClientService httpClientService;
        private readonly ICacheService cacheService;

        private readonly JsonSerializerSettings DefaultJsonSerializeSetting = new()
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

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
                GetFullDomainEnpoint($"bot/change_display_name/{botConfig.BotAccountId}"),
                PlainTextContentType,
                Encode(new Dictionary<string, object>
                {
                    { "display_name", botName }
                }),
                EncodeBase64ApiKey()
                );
        }

        public async Task<IList<string>> GetBotContactList()
        {
            var result = await httpClientService.ExecuteGetAsync<BotContactListResult>(
                GetFullDomainEnpoint($"bot/v2/contact?botId={botConfig.BotAccountId}"),
                PlainTextContentType);
            if (result.IsSuccess)
            {
                return result.Contacts;
            }

            return new List<string>();
        }

        public async Task<RoomData> GetChatRoomData(string roomToken)
        {
            ValidateInputParam(nameof(roomToken), roomToken);

            var result = await httpClientService.ExecuteGetAsync<RoomResult>(GetFullDomainEnpoint($"bot/v2/chatroom/data?botId={botConfig.BotAccountId}&room={roomToken}"), PlainTextContentType);

            if (result.IsSuccess)
            {
                return result.Room;
            }

            return null;
        }

        public async Task<(Contact, bool)> GetProfileAsync(string accountId)
        {
            ValidateInputParam(nameof(accountId), accountId);

            var result = await httpClientService.ExecuteGetAsync<ProfileResult>($"bot/get_profile/{botConfig.BotAccountId}/user/{accountId}");

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

        private async Task<PushMessageResult> PushAsync(IEnumerable<string> accountIds, Payload payload, string type = Models.MessageType.Text)
        {
            ValidateInputParam(nameof(accountIds), accountIds);
            ValidateInputParam(nameof(payload), payload);

            var accountIdToLowerList = accountIds.Select(accountId => accountId.ToLowerInvariant());

            payload.UserId = botConfig.BotUserId;
            payload.Time = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            payload.HashType = botConfig.EncryptionMode;
            payload.From = botConfig.BusinessAccountType;
            payload.Type = type;
            payload.Id = payloadId;
            payload.Receiver = accountIdToLowerList.ElementAt(0);
            payload.HashId = botConfig.ChatKeyVersion;

            var result = await httpClientService.ExecutePostAsync<PushMessageResult>(
                GetFullDomainEnpoint($"bot/push/{botConfig.BotAccountId}"),
                PlainTextContentType,
                Encode(
                new Dictionary<string, object>
                {
                    { "receiver", accountIdToLowerList },
                    { "payload", JsonConvert.SerializeObject(payload, DefaultJsonSerializeSetting) }
                }),
                EncodeBase64ApiKey()
                );

            return result;
        }

        public async Task<PushMessageResult> PushAsync(IEnumerable<string> accountIds, string message, DateTime? expiredTime = null)
                    => await PushAsync(accountIds, new Message { Content = message }, expiredTime);

        public async Task<PushMessageResult> PushAsync(string accountId, string message, DateTime? expiredTime = null)
                    => await PushAsync(new List<string> { accountId }, message, expiredTime);

        public async Task<PushMessageResult> PushAsync(IEnumerable<string> accountIds, Message message, DateTime? expiredTime = null)
        {
            ValidateInputParam(nameof(accountIds), accountIds);
            ValidateInputParam(nameof(message), message);

            var payload = new Payload();
            var formattedMessage = JsonConvert.SerializeObject(message, DefaultJsonSerializeSetting);
            payload.HashContentKey = CryptographyHelper.Hash(formattedMessage);
            payload.HashContent = CryptographyHelper.Encrypt(formattedMessage, botConfig.ChatKey, payload.HashContentKey);

            return await PushAsync(accountIds, payload);
        }

        public async Task<PushMessageResult> PushMultiRoomAsync(IEnumerable<string> roomTokenList, OutgoingMessage message)
        {
            ValidateInputParam(nameof(roomTokenList), roomTokenList);
            ValidateInputParam(nameof(message), message);
            ValidateMultiCastMessage(message);

            var token = await GetSignAccessTokenAsync();
            var result = await httpClientService.ExecutePostAsync<PushMessageResult>(
                GetFullDomainEnpoint($"bot/v3/message/multi-chatroom"),
                JsonContentType,
                JsonConvert.SerializeObject(
                new Dictionary<string, object>
                {
                    { "msg", message },
                    { "receivers", roomTokenList }
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
                      GetFullDomainEnpoint($"bot/v3/sign-token"),
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

        public async Task<BaseResult> PushRoomAsync(string chatroomToken, string message, DateTime? expiredTime = null)
        {
            ValidateInputParam(nameof(chatroomToken), chatroomToken);
            ValidateInputParam(nameof(message), message);
            var result = await httpClientService.ExecutePostAsync<BaseResult>(
               $"bot/push_chatroom/{botConfig.BotAccountId}",
               new Dictionary<string, object>
               {
                    { "receiver", chatroomToken },
                    { "msg", message }
               });

            return result ?? new BaseResult();
        }

        public async Task<BaseResult> SetAvatarAsync(string image)
        {
            ValidateInputParam(nameof(image), image);

            var result = await httpClientService.ExecutePostAsync<BaseResult>(
                $"bot/upload_avatar_image/{botConfig.BotAccountId}",
                new Dictionary<string, object>
                {
                    { "image", image }
                });

            return result;
        }

        public async Task<BaseResult> SetPermissionAddBotToGroup(bool isAllowed)
        {
            var result = await httpClientService.ExecutePostAsync<BaseResult>(
               $"bot/v2/chatroom_switch",
               new Dictionary<string, object>
               {
                    { "botId", botConfig.BotAccountId },
                    { "on", isAllowed ? 1 : 0 }
               });

            return result;
        }

        public async Task<BaseResult> SetWebhookAsync(string url)
        {
            ValidateInputParam(nameof(url), url);
            return await httpClientService.ExecutePostAsync<BaseResult>(
                $"bot/set_webhook/{botConfig.BotAccountId}",
                new Dictionary<string, object>
                {
                    { "url", url }
                });
        }

        public async Task<BaseResult> SetWelcomeMessageAsync(string message)
        {
            ValidateInputParam(nameof(message), message);

            return await httpClientService.ExecutePostAsync<BaseResult>(
                  $"bot/set_welcome_msg/{botConfig.BotAccountId}",
                  new Dictionary<string, object>
                {
                    { "message", message }
                });
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
            var result = await httpClientService.ExecuteGetAsync<BotChatRoomListResult>($"bot/v2/chatroom?botId={botConfig.BotAccountId}");
            if (result.IsSuccess)
            {
                return result.Rooms;
            }

            return new List<string>();
        }

        public async Task<string> GetWebhookAsync()
        {
            var result = await httpClientService.ExecuteGetAsync<WebhookResult>($"bot/get_webhook/{botConfig.BotAccountId}");

            if (result.IsSuccess)
            {
                return result.Url;
            }

            return string.Empty;
        }

        public async Task<PushMessageResult> PushPersonalAsync(IEnumerable<string> accountIds, OutgoingMessage message, bool isForcePush = true)
        {
            ValidateInputParam(nameof(accountIds), accountIds);
            ValidateInputParam(nameof(message), message);
            ValidateMultiCastMessage(message);

            var token = await GetSignAccessTokenAsync();
            var result = await httpClientService.ExecutePostAsync<PushMessageResult>(
                $"bot/v3/message/multicast",
                new Dictionary<string, object>
                {
                    { "msg", message },
                    { "receivers", accountIds.ToArray() },
                    { "forcePush", isForcePush ? 1 : 0 }
                },
                token,
                encodeData: false);

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

        private string EncodeBase64ApiKey()
            => Convert.ToBase64String(Encoding.UTF8.GetBytes(botConfig.ApiKey));

        private string GetFullDomainEnpoint(string endpoint) => botConfig.ApiEndpoint + endpoint;
    }
}