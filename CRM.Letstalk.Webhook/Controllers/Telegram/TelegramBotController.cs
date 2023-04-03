namespace CRM.Letstalk.Webhook.Controllers.Telegram
{
    using CRM.Letstalk.Core.Models;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Authorization;
    using System.Threading.Tasks;
    using System;
    using CRM.Letstalk.Core.Services.Interfaces;

    public class TelegramBotController : Controller
    {
        private readonly IEnumerable<TelegramBotConfigurations> botConfigurations;
        private readonly ITelegramBotService telegramBotService;

        public TelegramBotController(
            IOptions<List<TelegramBotConfigurations>> botConfigurations,
            ITelegramBotService telegramBotService)
        {
            this.botConfigurations = botConfigurations.Value;
            this.telegramBotService = telegramBotService;
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/setWebhook")]
        public async Task<IActionResult> SetWebhook()
        {
            try
            {
                await telegramBotService.SetWebhookAsync();
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

            return Ok("Successfully!");
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/healthcheck")]
        public async Task<IActionResult> HealthCheck()
        {
            try
            {
                foreach (var bot in botConfigurations)
                {
                    await telegramBotService.GetBotInfoAsync(bot.BotId);
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

            return Ok("Bots are healthy!");
        }
    }
}
