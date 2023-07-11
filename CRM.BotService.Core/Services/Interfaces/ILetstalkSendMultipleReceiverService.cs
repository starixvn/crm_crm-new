namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Models.BotServices.Announcement;

    public interface ILetstalkSendMultipleReceiverService
    {
        Task<IEnumerable<AnnouncementNotificationUpdateResult>> SendFornattedTextAndImagesAsync(IEnumerable<AnnouncementNotification> notifications);

        Task<IEnumerable<AnnouncementNotificationUpdateResult>> SendImageAsync(IEnumerable<AnnouncementNotification> notifications);
    }
}