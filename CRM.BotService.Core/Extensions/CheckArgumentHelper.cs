namespace CRM.BotService.Core.Extensions
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;

    public static class CheckArgumentHelper
    {
        public static void CheckValidBot(List<LetstalkBotConfig> botConfigs, int botId)
        {
            if (!botConfigs.Any(config => config.BotAccountId == botId))
            {
                throw new KeyNotFoundException($"Not found the bot ID {botId} in configurations!");
            }
        }
    }
}