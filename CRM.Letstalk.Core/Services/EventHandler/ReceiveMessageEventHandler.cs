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
        private readonly ICryptographyService cryptographyService;
        private const string ReplayChat = "Hello, I am Bot.";

        public ReceiveMessageEventHandler(Func<int, ILetstalkService> letstalkService,
            ICryptographyService cryptographyService)
        {
            this.letstalkService = letstalkService;
            this.cryptographyService = cryptographyService;
        }

        public async Task EventHandleAsync(HookEvent hookEvent, BotConfig botConfig)
        {
            try
            {
                hookEvent.PayloadObject = JsonConvert.DeserializeObject<Payload>(hookEvent.EncodedPayload);
                var msgContent = cryptographyService.Decrypt(hookEvent.PayloadObject.HashContent, botConfig.ChatKey, hookEvent.PayloadObject.HashContentKey);
                await letstalkService(botConfig.BotAccountId).PushAsync(hookEvent.Source.UserId, ReplayChat);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}