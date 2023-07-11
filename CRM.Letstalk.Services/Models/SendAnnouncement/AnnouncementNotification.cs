namespace CRM.Letstalk.Services.Models.SendAnnouncement
{
    using CRM.Core.Enumerables;

    public class AnnouncementNotification
    {
        public int NotificationId { get; set; }
        public long BotId { get; set; }
        public int ConversationGroupId { get; set; }
        public int ChatTypeId { get; set; }
        public string Content { get; set; }
        public int BotId { get; set; }
        public string ConversationId { get; set; }
        public bool IsOnlyRetryImage { get; set; }
        public BotChannel ChannelId { get; set; } = BotChannel.Letstalk;

        public ChatType ChatType
        {
            get
            {
                return (ChatType)ChatTypeId;
            }
        }
    }
}