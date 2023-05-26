namespace CRM.BotService.Core.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using CRM.Core.Services;

    public class BotCommonService : IBotCommonService
    {
        private readonly IBaseService baseService;
        private readonly List<BotChannelInfo> botChannelInfos;

        public BotCommonService(IBaseService baseService, List<BotChannelInfo> botChannelInfos)
        {
            this.baseService = baseService;
            this.botChannelInfos = botChannelInfos;
        }

        public bool IsActiveChannel(BotChannel channel)
            => botChannelInfos is not null && botChannelInfos.Any(c => c.Name == channel && c.IsActive);

        public async Task WriteLogMessageAsyns(int notificationId, long botId, string conversationId, string content, bool isSuccess, bool isBotBlocked, string errMsg)
        {
            var command = new WriteLogMessageCommand
            {
                NotificationId = notificationId,
                BotId = botId,
                Content = content,
                ConversationId = conversationId,
                IsSuccess = isSuccess,
                IsBotBlocked = isBotBlocked,
                ErrMsg = errMsg,
            };

            await baseService.ExecuteNonQueryAsync(command);
        }
    }
}