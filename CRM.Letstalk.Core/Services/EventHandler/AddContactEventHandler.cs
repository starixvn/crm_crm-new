namespace CRM.BotService.Core.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services.Interfaces;

    public class AddContactEventHandler : IEventHandler
    {
        private readonly Func<int, ILetstalkService> letstalkService;
        private const string greeting = "Hello, I am {0}!";

        public AddContactEventHandler(Func<int, ILetstalkService> letstalkService)
        {
            this.letstalkService = letstalkService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, BotConfig botConfig)
        {
            if (hookEvent.Type == EventType.AddContact)
            {
                await letstalkService(botConfig.BotAccountId).PushAsync(hookEvent.Source.UserId, string.Format(greeting, botConfig.BotUserId));
            }
        }
    }
}