namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Enum;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using global::Telegram.Bot.Types;
    using global::Telegram.Bot.Types.Enums;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class UpdateController : Controller
    {
        private readonly Func<long, ITelegramBotService> telegramBotService;
        private readonly ICRMLogService logService;
        private readonly IBaseService baseService;

        public UpdateController(
            ICRMLogService logService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService)
        {
            this.logService = logService;
            this.telegramBotService = telegramBotService;
            this.baseService = baseService;
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
                User bot = await telegramBotService(botId).GetBotInfoAsync(botId);
                if (bot == null)
                {
                    await logService.ErrorMessageAsync($"Telegram Bot {botId} is invalid.");
                    return Ok($"Telegram Bot {botId} is invalid.");
                }
                await HandleEventUpdate(bot, update.Message);

                return Ok();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
                return Ok(ex.Message);
            }
        }

        protected internal virtual async Task HandleEventUpdate(User bot, Message message)
        {
            switch (message.Type)
            {
                case MessageType.Text:
                    await HandleBotCommandAsync(bot, message);
                    break;

                case MessageType.ChatTitleChanged:
                    await EditChatTitledAsync(message);
                    break;
                case MessageType.GroupCreated:
                    await AddBotToGroupAsync(message, bot);
                    break;

                case MessageType.ChatMembersAdded:
                    User[] bots = message.NewChatMembers.Where(x => x.IsBot).ToArray();
                    for (var i = 0; i < bots.Length; i++)
                    {
                        await AddBotToGroupAsync(message, bots[i]);
                    }
                    break;

                case MessageType.ChatMemberLeft:
                    await RemoveBotToGroupAsync(message);
                    break;

                case MessageType.MigratedToSupergroup:
                    await MigratedToSupergroupAsync(message);
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
                if(command.Equals("/start", StringComparison.CurrentCultureIgnoreCase) && message.Chat.Type == ChatType.Private)
                {
                    await AddBotToPersonal(message, bot);
                }
                if (command.Equals("/getgroupid", StringComparison.CurrentCultureIgnoreCase)
                    || command.Equals($"/getgroupid@{bot.Username}", StringComparison.CurrentCultureIgnoreCase))
                {
                    await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, message.Chat.Id.ToString());
                }
            }
        }

        protected internal virtual async Task<CommandResult> EditChatTitledAsync(Message message)
        {
            var command = new UpdateGroupNameCommand
            {
                ConversationId = message.Chat.Id.ToString(),
                DisplayName = message.NewChatTitle,
                UpdatedBy = message.From.Id.ToString()
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }

        protected internal virtual async Task<CommandResult> AddBotToGroupAsync(Message message, User bot)
        {
            var command = new AddBotToGroupCommand
            {
                BotId = bot.Id,
                BotName = bot.FirstName,
                ConversationId = message.Chat.Id.ToString(),
                GroupName = message.Chat.Title,
                ChannelId = (byte)ConversationChannel.Telegram,
                UpdatedBy = message.From.Id.ToString()
            };
            var result = await baseService.ExecuteNonQueryAsync(command);
            string greeting = $"Hi, I am {bot.Username}, your ID: {message.Chat.Id}";
            await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, greeting);
            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
            return result;
        }

        protected internal virtual async Task RemoveBotToGroupAsync(Message message)
        {
            if (message.LeftChatMember.IsBot)
            {
                var command = new RemoveBotFromGroupCommand
                {
                    BotId = message.LeftChatMember.Id,
                    ConversationId = message.Chat.Id.ToString(),
                    UpdatedBy = message.From.Id.ToString()
                };
                var result = await baseService.ExecuteNonQueryAsync(command);
                if (!result.IsSuccessful)
                {
                    await logService.ErrorAsync(new Exception(result.Message));
                }
            }
        }

        protected internal virtual async Task<CommandResult> MigratedToSupergroupAsync(Message message)
        {
            var command = new MigratedToSupergroupCommand
            {
                FromConversationId = message.Chat.Id.ToString(),
                ToConversationId = message.MigrateToChatId.ToString(),
                UpdatedBy = message.From.Id.ToString()
            };
            var result = await baseService.ExecuteNonQueryAsync(command);
            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
            return result;
        }

        protected internal virtual async Task AddBotToPersonal(Message message, User bot)
        {
            var command = new AddBotToPersonalCommand
            {
                BotId = bot.Id,
                BotName = bot.FirstName,
                ConversationId = message.Chat.Id.ToString(),
                Username = message.Chat.Username,
                ChannelId = (byte)ConversationChannel.Telegram,
                UpdatedBy = message.Chat.Id.ToString()
            };
            var result = await baseService.ExecuteNonQueryAsync(command);
            string greeting = $"Hi, I am {bot.Username}, your ID: {message.Chat.Id}";
            await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, greeting);
            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }
    }
}