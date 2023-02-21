namespace CRM.Letstalk.Core.Services.EventHandler

{
    using System;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Models;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Services.Interfaces;
    using Newtonsoft.Json;

    public class ReceiveMessageEventHandler : IEventHandler
    {
        private readonly Func<int, ILetstalkService> letstalkService;
        private const string ReplayChat = "Hello, I am Bot. Your ID: {0}";

        public ReceiveMessageEventHandler(Func<int, ILetstalkService> letstalkService)
        {
            this.letstalkService = letstalkService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, BotConfig botConfig)
        {
            hookEvent.PayloadObject = JsonConvert.DeserializeObject<Payload>(hookEvent.EncodedPayload);
            await letstalkService(botConfig.BotAccountId).PushAsync(hookEvent.Source.UserId, string.Format(ReplayChat, hookEvent.Source.UserId));
        }
    }
}