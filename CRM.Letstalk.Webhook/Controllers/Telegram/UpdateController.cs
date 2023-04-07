namespace CRM.Letstalk.Webhook.Controllers.Telegram
{
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Letstalk.Core.Services.Interfaces;
    using global::Telegram.Bot.Types.Enums;
    using global::Telegram.Bot.Types;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.VisualBasic;
    using System.Linq;
    using CRM.Core.Models;
    using CRM.Letstalk.Core.Criteria;
    using System.Text.RegularExpressions;
    using System;

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

        protected internal virtual async Task UpdateEventByType(Message message, User bot)
        {
            switch (message.Type)
            {
                case MessageType.Text:
                    await HandleBotCommandAsync(bot, message);
                    break;

                //case MessageType.ChatTitleChanged:
                //    await EditChatTitledAsync(message);
                //    break;

                //case MessageType.GroupCreated:
                //    await AddBotToGroupAsync(message, bot);
                //    break;

                //case MessageType.ChatMembersAdded:
                //    User[] bots = message.NewChatMembers.Where(x => x.IsBot).ToArray();
                //    for (var i = 0; i < bots.Length; i++)
                //    {
                //        await AddBotToGroupAsync(message, bots[i]);
                //    }
                //    break;

                //case MessageType.ChatMemberLeft:
                //    await RemoveBotToGroupAsync(message);
                //    break;

                //case MessageType.MigratedToSupergroup:
                //    await MigratedToSupergroupAsync(message);
                //    break;

                default:
                    // do nothing
                    break;
            }
        }

        //protected internal virtual async Task<CommandResult> EditChatTitledAsync(Message message)
        //{
        //    var command = new UpdateGroupTopicCommand
        //    {
        //        ConversationId = message.Chat.Id.ToString(),
        //        GroupName = message.NewChatTitle,
        //        UpdatedBy = message.From.Id.ToString()
        //    };
        //    return await conversationService.UpdateGroupTopic(command);
        //}

        //protected internal virtual async Task<CommandResult> AddBotToGroupAsync(Message message, User bot)
        //{
        //    var command = new AddBotToGroupCommand
        //    {
        //        BotConversationId = bot.Id.ToString(),
        //        BotName = bot.FirstName,
        //        ConversationId = message.Chat.Id.ToString(),
        //        GroupName = message.Chat.Title,
        //        ChannelId = (byte)ConversationChannel.Telegram,
        //        ServiceUrl = string.Empty,
        //        UpdatedBy = message.From.Id.ToString()
        //    };
        //    return await conversationService.AddBotToGroup(command);
        //}

        //protected internal virtual async Task<CommandResult> RemoveBotToGroupAsync(Message message)
        //{
        //    if (message.LeftChatMember.IsBot)
        //    {
        //        var command = new RemoveBotOutGroupCommand
        //        {
        //            BotConversationId = message.LeftChatMember.Id.ToString(),
        //            ConversationId = message.Chat.Id.ToString(),
        //            UpdatedBy = message.From.Id.ToString()
        //        };
        //        return await conversationService.RemoveBotOutGroup(command);
        //    }

        //    return new CommandResult { Code = 0, Message = string.Empty };
        //}

        //protected internal virtual async Task<CommandResult> MigratedToSupergroupAsync(Message message)
        //{
        //    var command = new MigratedToSupergroupCommand
        //    {
        //        FromConversationId = message.Chat.Id.ToString(),
        //        ToConversationId = message.MigrateToChatId.ToString(),
        //        UpdatedBy = message.From.Id.ToString()
        //    };
        //    return await conversationService.MigratedToSupergroupAsync(command);
        //}

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
