namespace CRM.BotService.Core.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;

    public class AddContactEventHandler : IEventHandler
    {
        private readonly Func<int, ILetstalkClientService> letstalkService;
        private const string greeting = "Hello, I am {0}!";

        public AddContactEventHandler(Func<int, ILetstalkClientService> letstalkService)
        {
            this.letstalkService = letstalkService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            if (hookEvent.Type == EventType.AddContact)
            {
                await letstalkService(botConfig.BotAccountId).PushPersonalAsync(hookEvent.Source.UserId,
                    new OutgoingMessage
                    {
                        Text = greeting,
                        MessageType = NotificationMessageType.Text
                    });
            }
        }
    }
}