namespace CRM.BotService.Core.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;

    public class ChangeGroupNameEventHandler : IEventHandler
    {
        private readonly IBaseService baseService;
        private readonly Func<int, ILetstalkClientService> letstalkService;
        private readonly ICRMLogService logService;

        public ChangeGroupNameEventHandler(IBaseService baseService,
            Func<int, ILetstalkClientService> letstalkService,
            ICRMLogService logService)
        {
            this.baseService = baseService;
            this.letstalkService = letstalkService;
            this.logService = logService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            var roomData = await letstalkService(botConfig.BotAccountId).GetChatRoomData(hookEvent.Source.GroupId);

            var command = new UpdateGroupNameCommand
            {
                ConversationId = hookEvent.Source.GroupId,
                DisplayName = roomData.Title
            };

            var result = await baseService.ExecuteNonQueryAsync(command);

            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }
    }
}