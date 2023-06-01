namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.ViewModel;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class TelegramWebhookController : Controller
    {
        private readonly List<TelegramBotConfigurations> botConfigurations;
        private readonly Func<long, ITelegramBotService> telegramBotService;
        private readonly ICRMLogService logService;

        public TelegramWebhookController(
            List<TelegramBotConfigurations> botConfigurations,
            Func<long, ITelegramBotService> telegramBotService,
            ICRMLogService logService)
        {
            this.botConfigurations = botConfigurations;
            this.telegramBotService = telegramBotService;
            this.logService = logService;
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/setWebhook")]
        public async Task<IActionResult> SetWebhook()
        {
            try
            {
                foreach (var bot in botConfigurations)
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
            if (bot is not null)
            {
                var webhookInfo = await telegramBotService(bot.BotId).GetWebhookInfoAsync(bot);
                return Ok(webhookInfo);
            }
            else
            {
                return Ok("bot does not exist.");
            }
        }

        [AllowAnonymous]
        [Route("api/telegram/bot/getBotInfo")]
        public async Task<IActionResult> GetBotInfo(long botId)
        {
            try
            {
                var bot = botConfigurations.FirstOrDefault(config => config.BotId == botId);
                if (bot is not null)
                {
                    var user = await telegramBotService(bot.BotId).GetBotInfoAsync(bot.BotId);
                    return Ok(user);
                }
                else
                {
                    return Ok("bot does not exist.");
                }
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/telegram/bot/get-profile")]
        public async Task<IActionResult> CheckPersonalProfileAsync([FromBody] TelegramBotConversationViewModel model)
        {
            try
            {
                var profile = await telegramBotService(model.BotId).GetChatAsync(model.BotId, model.ChatId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
                return Ok();
            }
        }
    }
}