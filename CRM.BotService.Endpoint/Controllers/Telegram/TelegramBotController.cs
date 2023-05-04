namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Security.Cryptography;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services;
    using CRM.BotService.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Pipelines.Sockets.Unofficial;

    public class TelegramBotController : Controller
    {
        private readonly IEnumerable<TelegramBotConfigurations> botConfigurations;
        private readonly Func<long, ITelegramBotService> telegramBotService;

        public TelegramBotController(
            List<TelegramBotConfigurations> botConfigurations,
            Func<long, ITelegramBotService> telegramBotService)
        {
            this.botConfigurations = botConfigurations;
            this.telegramBotService = telegramBotService;
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/setWebhook")]
        public async Task<IActionResult> SetWebhook()
        {
            try
            {
                foreach(var bot in botConfigurations)
                {
                    await telegramBotService(bot.BotId).SetWebhookAsync(bot);
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

            return Ok("Successfully!");
        }
        [AllowAnonymous]
        [Route("api/telegram/bot/getWebhookInfo")]
        public async Task<IActionResult> GetWebhookInfo(long botId)
        {
            var bot = botConfigurations.FirstOrDefault(config => config.BotId == botId);
            if (bot != null)
            {
                var webhookInfo = await telegramBotService(bot.BotId).GetWebhookInfoAsync(bot);
                return Ok(webhookInfo);
            }
            else
            {
                return Content("bot does not exist.");
            }
        }
        

        [AllowAnonymous]
        [Route("api/telegram/bot/getBotInfo")]
        public async Task<IActionResult> GetBotInfo(long botId)
        {
            try
            {
                var bot = botConfigurations.FirstOrDefault(config => config.BotId == botId);
                if(bot != null)
                {
                    var user = await telegramBotService(bot.BotId).GetBotInfoAsync(bot.BotId);
                    return Ok(user);
                }
                else
                {
                   return Content("bot does not exist.");
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}