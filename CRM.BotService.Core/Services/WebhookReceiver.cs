namespace CRM.BotService.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Extensions;
    using CRM.BotService.Core.Extensions.Letstalk;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json.Linq;

    public class WebhookReceiver : IWebhookReceiver
    {
        private readonly ICRMLogService logService;
        private readonly Func<string, IEventHandler> eventHandler;
        private readonly List<LetstalkBotConfig> botConfigs;

        public WebhookReceiver(
            ICRMLogService logService,
            Func<string, IEventHandler> eventHandler,
            List<LetstalkBotConfig> botConfigs)
        {
            this.logService = logService;
            this.eventHandler = eventHandler;
            this.botConfigs = botConfigs;
        }

        public async Task ReceiveAsync(HttpRequest request, int botId)
        {
            CheckArgumentHelper.CheckValidBot(botConfigs, botId);

            string requestJson;
            var botConfig = botConfigs.FirstOrDefault(config => config.BotAccountId == botId);
            if (botConfig is not null)
            {
                using (TextReader reader = new StreamReader(request.Body))
                {
                    requestJson = await reader.ReadToEndAsync();
                }

                var rawData = JwtHelper.Decode(botConfig.SecureKey, requestJson.Trim());
                logService.LogInformation(rawData);
                var data = JObject.Parse(rawData);
                var hookEvent = data.ToObject<HookEvent>();
                await eventHandler(hookEvent.Type).EventHandleAsync(hookEvent, botConfig);
            }
        }
    }
}