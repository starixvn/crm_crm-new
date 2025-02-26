namespace CRM.Letstalk.Services.Models.SendAnnouncement
{
    using System;
    using CRM.Core.Extensions.XML;

    [XMLName("r")]
    public class SendAnnouncementUpdateStatus
    {
        public int NotificationId { get; set; }
        public int ConversationGroupId { get; set; }
        public DateTime SentDate { get; set; }
        public string Status { get; set; }
        public string ErrMsg { get; set; }
        public bool IsOnlyRetryImage { get; set; }
        public string ErrImages { get; set; }
    }
}