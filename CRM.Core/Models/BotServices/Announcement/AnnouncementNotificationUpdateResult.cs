namespace CRM.Core.Models.BotServices.Announcement
{
    using CRM.Core.Extensions.XML;

    [XMLName("r")]
    public class AnnouncementNotificationUpdateResult
    {
        public int NotificationId { get; set; }
        public int ConversationGroupId { get; set; }
        public string Status { get; set; }
        public string ErrMsg { get; set; }
        public bool IsOnlyRetryImage { get; set; }
        public string ErrImages { get; set; }
    }
}