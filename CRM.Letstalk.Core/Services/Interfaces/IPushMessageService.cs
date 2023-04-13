namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.Models.BotServices;

    public interface IPushMessageService
    {
        Task<SendResult> PushAsync(NotificationMessage notification);
    }
}