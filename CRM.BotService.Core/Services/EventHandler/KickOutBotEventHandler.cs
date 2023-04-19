namespace CRM.BotService.Core.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;

    public class KickOutBotEventHandler : IEventHandler
    {
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;

        public KickOutBotEventHandler(IBaseService baseService, ICRMLogService logService)
        {
            this.baseService = baseService;
            this.logService = logService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            var command = new RemoveBotFromGroupCommand
            {
                ConversationId = hookEvent.Source.GroupId,
                BotId = botConfig.BotAccountId,
            };

            var result = await baseService.ExecuteNonQueryAsync(command);

            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }
    }
}