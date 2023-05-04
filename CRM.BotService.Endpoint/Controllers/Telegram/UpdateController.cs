namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;
    using Fanex.Data.Repository;
    using global::Telegram.Bot.Types;
    using global::Telegram.Bot.Types.Enums;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class UpdateController : Controller
    {
        private readonly ITelegramBotService botService;
        private readonly ICRMLogService logService;

        public UpdateController(
            ICRMLogService logService,
            ITelegramBotService botService)
        {
            this.logService = logService;
            this.botService = botService;
        }

        [HttpPost]
        [Route("api/telegram/webhook/{botId:long}/update")]
        public async Task<IActionResult> Post(long botId, [FromBody] Update update)
        {
            try
            {
                var updateJson = JsonConvert.SerializeObject(update, Formatting.Indented);
                logService.LogInformation(updateJson);
                if (update == null || update.Type != UpdateType.Message)
                {
                    return Ok();
                }

                User bot = await botService.GetBotInfoAsync(botId);
                if (bot == null)
                {
                    await logService.ErrorMessageAsync($"Telegram Bot {botId} is invalid.");
                    return Ok($"Telegram Bot {botId} is invalid.");
                }
                await UpdateEventByType(update.Message, bot);

                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        protected internal virtual async Task UpdateEventByType(Message message, User bot)
        {
            switch (message.Type)
            {
                case MessageType.Text:
                    await HandleBotCommandAsync(bot, message);
                    break;

                default:
                    // do nothing
                    break;
            }
        }
       

        protected internal virtual async Task HandleBotCommandAsync(User bot, Message message)
        {
            var commands = message.Entities.Where(entity => entity.Type == MessageEntityType.BotCommand)
                .Select(entity => message.Text.Substring(entity.Offset, entity.Length)).ToList();
            foreach (var command in commands)
            {
                if (command.Equals("/getgroupid", StringComparison.CurrentCultureIgnoreCase)
                    || command.Equals($"/getgroupid@{bot.Username}", StringComparison.CurrentCultureIgnoreCase))
                {
                    await botService.SendTextMessageAsync(bot.Id, message.Chat.Id, message.Chat.Id.ToString());
                }
            }
        }
    }
}