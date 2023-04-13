namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.BotService.Core.Models;
    using CRM.Letstalk.Client.Configurations;

    public interface IEventHandler
    {
        Task EventHandleAsync(HookEvent hookEvent, BotConfig botConfig);
    }
}