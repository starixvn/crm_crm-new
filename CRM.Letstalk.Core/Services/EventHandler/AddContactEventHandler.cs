namespace CRM.Letstalk.Core.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Core.Constants;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Services.Interfaces;

    public class AddContactEventHandler : IEventHandler
    {
        private readonly Func<long, ILetstalkService> letstalkService;
        private const string greeting = "Hello, I am {0}!";

        public AddContactEventHandler(Func<long, ILetstalkService> letstalkService)
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