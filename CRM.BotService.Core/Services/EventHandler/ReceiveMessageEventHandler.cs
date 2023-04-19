namespace CRM.BotService.Core.Services.EventHandler

{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using Newtonsoft.Json;

    public class ReceiveMessageEventHandler : IEventHandler
    {
        private readonly Func<int, ILetstalkClientService> letstalkService;
        private const string ReplayChat = "Hello, I am Bot. Your ID: {0}";

        public ReceiveMessageEventHandler(Func<int, ILetstalkClientService> letstalkService)
        {
            this.letstalkService = letstalkService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            hookEvent.PayloadObject = JsonConvert.DeserializeObject<Payload>(hookEvent.EncodedPayload);
            await letstalkService(botConfig.BotAccountId).PushPersonalAsync(hookEvent.Source.UserId,
                new OutgoingMessage
                {
                    Text = string.Format(ReplayChat, hookEvent.Source.UserId),
                    MessageType = NotificationMessageType.Text
                }); ;
        }
    }
}