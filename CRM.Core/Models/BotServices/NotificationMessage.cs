namespace CRM.Core.Models.BotServices
{
    using CRM.Core.Enumerables;

    public class NotificationMessage
    {
        public int AnnouncementId { get; set; }
        public int NotificationId { get; set; }
        public int BotId { get; set; }
        public int ChatTypeId { get; set; }
        public string ConversationId { get; set; }
        public string Content { get; set; }
        public string FileName { get; set; }
        public string[] Images { get; set; }
        public BotChannel Channel { get; set; } = BotChannel.Letstalk;

        public NotificationMessageType MessageType
        {
            get
            {
                if (AnnouncementId > 0)
                {
                    return NotificationMessageType.Html;
                }
                return NotificationMessageType.Text;
            }
        }

        public ChatType ChatType
        {
            get
            {
                return (ChatType)ChatTypeId;
            }
        }
    }
}