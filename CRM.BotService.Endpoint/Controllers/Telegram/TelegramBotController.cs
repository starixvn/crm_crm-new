namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class TelegramBotController : Controller
    {
        private readonly IEnumerable<TelegramBotConfigurations> botConfigurations;
        private readonly ITelegramBotService telegramBotService;

        public TelegramBotController(
            List<TelegramBotConfigurations> botConfigurations,
            ITelegramBotService telegramBotService)
        {
            this.botConfigurations = botConfigurations;
            this.telegramBotService = telegramBotService;
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/setWebhook")]
        public async Task<IActionResult> SetWebhook(string url)
        {
            try
            {
                await telegramBotService.SetWebhookAsync(url);
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