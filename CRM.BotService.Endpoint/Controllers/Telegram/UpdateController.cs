using System.Diagnostics;
using System.IO.Compression;
namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Enum;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.Caching;
    using global::Telegram.Bot.Types;
    using global::Telegram.Bot.Types.Enums;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class UpdateController : Controller
    {
        private readonly Func<long, ITelegramBotService> telegramBotService;
        private readonly ICRMLogService logService;
        private readonly IBaseService baseService;
        private readonly List<TelegramBotConfigurations> botConfigurations;
        private readonly ICacheService cacheService;

        private const string CurrentGreetingKey = "CurrentGreetingKey";

        public UpdateController(
            ICRMLogService logService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService,
            List<TelegramBotConfigurations> botConfigurations,
            ICacheService cacheService)
        {
            this.logService = logService;
            this.telegramBotService = telegramBotService;
            this.baseService = baseService;
            this.botConfigurations = botConfigurations;
            this.cacheService = cacheService;
        }

        [HttpPost]
        [Route("api/telegram/webhook/{botId:long}/update")]
        public async Task<IActionResult> Post(long botId, [FromBody] Update update)
        {
            try
            {
                logService.LogInformation(JsonConvert.SerializeObject(update, Formatting.Indented));

                if (update is null || update.Type != UpdateType.Message)
                {
                    return Ok();
                }
                User bot = await telegramBotService(botId).GetBotInfoAsync(botId);
                if (bot is null)
                {
                    await logService.ErrorMessageAsync($"Telegram Bot {botId} is invalid.");
                    return Ok($"Telegram Bot {botId} is invalid.");
                }
                await HandleEventUpdate(bot, update.Message);
                logService.LogInformation("End webhook telegram!!!");
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
                    await RemoveBotToGroupAsync(message, bot);
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
            var commands = message.Entities?.Where(entity => entity.Type == MessageEntityType.BotCommand)
                .Select(entity => message.Text.Substring(entity.Offset, entity.Length)).ToList();
            if (commands is null)
            {
                return;
            }
            foreach (var command in commands)
            {
                var isStartCommand = command.Equals("/start", StringComparison.CurrentCultureIgnoreCase);
                var isGetGroupIdCommand = command.Equals("/getgroupid", StringComparison.CurrentCultureIgnoreCase)
                    || command.Equals($"/getgroupid@{bot.Username}", StringComparison.CurrentCultureIgnoreCase);
                if (isStartCommand && message.Chat.Type == ChatType.Private)
                {
                    await AddBotToPersonalAsync(message, bot);
                }
                if (isGetGroupIdCommand)
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
                ChannelId = (byte)ConversationChannel.Telegram,
                UpdatedBy = message.From.Id.ToString()
            };
            var commandSerialize = JsonConvert.SerializeObject(command, Formatting.Indented);
            logService.LogInformation("start EditChatTitledAsync: " + commandSerialize);
            var result = await baseService.ExecuteNonQueryAsync(command);
            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
            logService.LogInformation("end EditChatTitledAsync!!!");
            return result;
        }

        protected internal virtual async Task<CommandResult> AddBotToGroupAsync(Message message, User bot)
        {
            var isExistBot = checkExistBot(bot.Id);

            if (!isExistBot)
            {
                logService.LogInformation($"bot: {bot.Id} does not exist");
                return new CommandResult();
            }

            var result = await CreateAddBotToGroupCommand(message, bot);

            if (result.IsSuccessful)
            {
                await HandleGreeting(message, bot);
            }
            else
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }

            logService.LogInformation("end AddBotToGroupAsync!!!");
            return result;
        }

        private async Task<CommandResult>  CreateAddBotToGroupCommand(Message message, User bot)
        {
            var command = new AddBotToGroupCommand
            {
                BotId = bot.Id,
                BotName = bot.Username,
                ConversationId = message.Chat.Id.ToString(),
                GroupName = message.Chat.Title,
                ChannelId = (byte)ConversationChannel.Telegram,
                UpdatedBy = message.From.Id.ToString()
            };
            var commandSerialize = JsonConvert.SerializeObject(command, Formatting.Indented);
            logService.LogInformation("start AddBotToGroupAsync: " + commandSerialize);

            var result = await baseService.ExecuteNonQueryAsync(command);
            return result;
        }

        private async Task HandleGreeting(Message message, User bot)
        {
            var greetingSession = await cacheService.GetAsync<CurrentBotGreeting>(CurrentGreetingKey);
            string greeting = string.Format(CommandMessageTelegram.AddBotToGroupGreetingMessage, bot.Username, message.Chat.Id);
            var newGreeting = new CurrentBotGreeting
            {
                BotId = bot.Id,
                Message = greeting
            };
            if (greetingSession is not null)
            {
                var isDuplicateGreeting = greetingSession.BotId == bot.Id && greetingSession.Message == greeting;

                if (!isDuplicateGreeting)
                {
                    await cacheService.SetAsync<CurrentBotGreeting>("CurrentGreetingKey", newGreeting);
                    await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, greeting);
                }
            }else
            {
                await cacheService.SetAsync<CurrentBotGreeting>("CurrentGreetingKey", newGreeting);
                await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, greeting);
            }
        }


        protected internal virtual async Task RemoveBotToGroupAsync(Message message, User bot)
        {
            var isExistBot = checkExistBot(bot.Id);
            if (isExistBot && message.LeftChatMember.IsBot)
            {
                var command = new RemoveBotFromGroupCommand
                {
                    BotId = message.LeftChatMember.Id,
                    ConversationId = message.Chat.Id.ToString(),
                    ChannelId = (byte)ConversationChannel.Telegram,
                    UpdatedBy = message.From.Id.ToString()
                };
                var commandSerialize = JsonConvert.SerializeObject(command, Formatting.Indented);
                logService.LogInformation("start RemoveBotToGroupAsync: " + commandSerialize);
                var result = await baseService.ExecuteNonQueryAsync(command);
                if (!result.IsSuccessful)
                {
                    await logService.ErrorAsync(new Exception(result.Message));
                }
                logService.LogInformation("end RemoveBotToGroupAsync!!!");
            }
        }

        protected internal virtual async Task<CommandResult> MigratedToSupergroupAsync(Message message)
        {
            var command = new UpdateConversationIdCommand
            {
                OldConversationId = message.Chat.Id.ToString(),
                NewConversationId = message.MigrateToChatId.ToString(),
                ChannelId = (byte)ConversationChannel.Telegram,
                UpdatedBy = message.From.Id.ToString()
            };
            var commandSerialize = JsonConvert.SerializeObject(command, Formatting.Indented);
            logService.LogInformation("start MigratedToSupergroupAsync: " + commandSerialize);
            var result = await baseService.ExecuteNonQueryAsync(command);
            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
            logService.LogInformation("end MigratedToSupergroupAsync!!!");
            return result;
        }

        protected internal virtual async Task AddBotToPersonalAsync(Message message, User bot)
        {
            logService.LogInformation("start AddBotToPersonal!!!");
            if (string.IsNullOrEmpty(message.Chat?.Username))
            {
                logService.LogInformation("empty username !!!");
                string errorMessageNotify = string.Format(CommandMessageTelegram.BotAddDoNotHaveUserName, bot.Username);
                await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, errorMessageNotify);
            }
            else
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
                var commandSerialize = JsonConvert.SerializeObject(command, Formatting.Indented);
                logService.LogInformation("start AddBotToPersonal: " + commandSerialize);

                var result = await baseService.ExecuteNonQueryAsync(command);
                string greeting = string.Format(CommandMessageTelegram.Wellcome, bot.Username, message.Chat.Id);
                await telegramBotService(bot.Id).SendTextMessageAsync(bot.Id, message.Chat.Id, greeting);
                if (!result.IsSuccessful)
                {
                    await logService.ErrorAsync(new Exception(result.Message));
                }
            }

            logService.LogInformation("end AddBotToPersonal!!!");
        }

        private bool checkExistBot(long botId) => botConfigurations.Any(x => x.BotId == botId);
    }
}