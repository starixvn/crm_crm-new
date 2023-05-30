namespace CRM.BotService.Endpoint.UnitTests.TestableClasses.Telegram
{
    using System;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.Controllers.Telegram;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using global::Telegram.Bot.Types;

    public class UpdateControllerTestable : UpdateController
    {
        public UpdateControllerTestable(
            ICRMLogService logService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService) : base(logService, telegramBotService, baseService)
        {
        }

        public async Task Public_HandleEventUpdate(User bot, Message message)
        {
            await base.HandleEventUpdate(bot, message);
        }

        public async Task Public_HandleBotCommandAsync(User bot, Message message)
        {
            await base.HandleBotCommandAsync(bot, message);
        }

        public async Task<CommandResult> Public_EditChatTitledAsync(Message message)
        {
            return await base.EditChatTitledAsync(message);
        }

        public async Task<CommandResult> Public_AddBotToGroupAsync(Message message, User bot)
        {
            return await base.AddBotToGroupAsync(message, bot);
        }

        public async Task Public_RemoveBotToGroupAsync(Message message)
        {
            await base.RemoveBotToGroupAsync(message);
        }

        public async Task<CommandResult> Public_MigratedToSupergroupAsync(Message message)
        {
            return await base.MigratedToSupergroupAsync(message);
        }
    }
}