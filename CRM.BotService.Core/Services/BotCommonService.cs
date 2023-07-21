namespace CRM.BotService.Core.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Core.Services;

    public class BotCommonService : IBotCommonService
    {
        private readonly IBaseService baseService;
        private readonly IHttpClientFactory httpClientFactory;
        private readonly List<BotChannelInfo> botChannelInfos;

        public BotCommonService(IBaseService baseService, IHttpClientFactory httpClientFactory, List<BotChannelInfo> botChannelInfos)
        {
            this.baseService = baseService;
            this.botChannelInfos = botChannelInfos;
            this.httpClientFactory = httpClientFactory;
        }

        public bool IsActiveChannel(BotChannel channel)
            => botChannelInfos is not null && botChannelInfos.Any(c => c.Name == channel && c.IsActive);

        public async Task<byte[]> ReadImageAsByteAsync(string imgUrl)
        {
            var httpClient = httpClientFactory.CreateClient();
            return await httpClient.GetByteArrayAsync(imgUrl);
        }

        public async Task<CommandResult> WriteLogMessageAsyns(WriteLogMessageCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}