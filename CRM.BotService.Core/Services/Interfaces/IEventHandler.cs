namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;

    public interface IEventHandler
    {
        Task EventHandleAsync(HookEvent hookEvent, LetstalkBotConfig botConfig);
    }
}