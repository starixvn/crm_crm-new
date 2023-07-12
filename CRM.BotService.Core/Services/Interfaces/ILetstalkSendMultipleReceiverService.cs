namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Models.BotServices.Announcement;

    public interface ILetstalkSendMultipleReceiverService
    {
        Task<IEnumerable<SendNotificationResult>> SendFornattedTextAndImagesAsync(IEnumerable<AnnouncementNotification> notifications);

        Task<IEnumerable<SendNotificationResult>> SendImageAsync(IEnumerable<AnnouncementNotification> notifications);
    }
}