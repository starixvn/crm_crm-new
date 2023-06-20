namespace CRM.Letstalk.Services.Models.SendAnnouncement
{
    using System.Collections.Generic;
    using CRM.Core.Enumerables;

    public class NotificationGroupContent
    {
        public int AnnouncementId { get; set; }
        public int BotId { get; set; }
        public ChatType ChatType { get; set; }
        public string Content { get; set; }
        public bool IsOnlyRetryImages { get; set; }
        public List<string> ConversationIds { get; set; }
        public List<string> Attachments { get; set; }
    }
}