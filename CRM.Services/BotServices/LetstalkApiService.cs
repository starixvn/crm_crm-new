namespace CRM.Services.BotServices
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using CRM.Models.ChatTypeMapping;
    using CRM.Services.BotServices.Interfaces;
    using CRM.ViewModels.ChatTypeMapping;
    using Fanex.Caching;

    public class LetstalkApiService : BotServiceHttpClientBase, ILetstalkApiService
    {
        public LetstalkApiService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory, ICacheService cacheService)
            : base(botSettings, httpClientFactory, cacheService)
        {
        }

        public async Task<LetstalkTelegramContact> GetPersonalDisplayNameAsync(long botId, string letstalkId)
        {
            var data = new { BotId = botId, LetstalkId = letstalkId };
            var results = await PostAsync<LetstalkTelegramContact>(ApiPath.GetLetstalkUserProfilePath, data);
            return results;
        }

        public async Task<LetsalkValidationModel> VerifyLetstalkOnGroup(long botId, string conversationGroupId, List<RecipientLetstalk> letstalkRecipients)
        {
            var letstalkIds = GetLetstalkIdList(letstalkRecipients);
            var inputParams = new
            {
                BotId = botId,
                ConversationGroupId = conversationGroupId,
                BotAccountIds = letstalkIds
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

        private static class ApiPath
        {
            internal const string GetLetstalkUserProfilePath = "api/letstalk/get-user-profile";
            internal const string VerifyUserOnGroupPath = "api/letstalk/verify-on-group";
        }
    }
}