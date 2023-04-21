namespace CRM.BotService.Endpoint.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.EventHandler;
    using CRM.BotService.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class LetstalkWebhookController : ControllerBase
    {
        private readonly ILetstalkEventHandler eventHandler;
        private readonly Func<int, ILetstalkClientService> letstalkService;
        private readonly List<WebhookConfiguration> webhookConfigurations;

        public LetstalkWebhookController(ILetstalkEventHandler eventHandler,
            Func<int, ILetstalkClientService> letstalkService,
            IOptions<List<WebhookConfiguration>> webhookConfigurations
            )
        {
            this.eventHandler = eventHandler;
            this.letstalkService = letstalkService;
            this.webhookConfigurations = webhookConfigurations.Value;
        }

        [Route("api/webhook/{id}")]
        public async Task WebhookReceiver(int id)
        {
            await eventHandler.ReceiveAsync(Request, id);
        }

        [Route("api/setwebhook/{id}")]
        public async Task<IActionResult> SetWebhook(int id)
        {
            var botConfigs = webhookConfigurations.FirstOrDefault(config => config.BotId == id);
            if (botConfigs != null && botConfigs.IsAllowedSet)
            {
                var webhookUrl = $"{botConfigs.WebhookBaseUrl}api/webhook/{id}";
                var result = await letstalkService(id).SetWebhookAsync(webhookUrl);
                return Ok(result);
            }

            return NotFound();
        }

        [Route("api/getwebhook/{id}")]
        public async Task<IActionResult> GetWebhook(int id)
        {
            var botConfigs = webhookConfigurations.FirstOrDefault(config => config.BotId == id);
            if (botConfigs != null && botConfigs.IsAllowedGet)
            {
                var result = await letstalkService(id).GetWebhookAsync();
                return Ok(result);
            }

            return NotFound();
        }
    }
}