namespace CRM.Letstalk.Core.Extensions
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Enumerables;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Models.Letstalk.BotConfig;

    public static class BotHelper
    {
        public static LetstalkBotConfig GetLetstalkBotConfig(IEnumerable<LetstalkBotConfig> bots, int botId)
            => bots.FirstOrDefault(bot => bot.BotAccountId == botId);

        public static bool IsActiveChannel(IEnumerable<Channel> channels, BotChannel channel)
            => channels.Any(c => c.Name == channel && c.IsActive);
    }
}