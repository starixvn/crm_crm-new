namespace CRM.BotService.Endpoint.UnitTests.TestableClasses.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.Controllers.Telegram;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.Caching;
    using global::Telegram.Bot.Types;

    public class UpdateControllerTestable : UpdateController
    {
        public UpdateControllerTestable(
            ICRMLogService logService,
            Func<long, ITelegramBotService> telegramBotService,
            IBaseService baseService,
            List<TelegramBotConfigurations> botConfigurations,
            ICacheService cacheService) : base(logService, telegramBotService, baseService, botConfigurations, cacheService)
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

        public async Task Public_RemoveBotToGroupAsync(Message message, User bot)
        {
            await base.RemoveBotToGroupAsync(message, bot);
        }

        public async Task Public_AddBotToPersonalAsync(Message message, User bot)
        {
            await base.AddBotToPersonalAsync(message, bot);
        }

        public async Task<CommandResult> Public_MigratedToSupergroupAsync(Message message)
        {
            return await base.MigratedToSupergroupAsync(message);
        }
    }
}