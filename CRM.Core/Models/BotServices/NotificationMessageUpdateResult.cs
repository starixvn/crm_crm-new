namespace CRM.Core.Models.BotServices
{
    using System;
    using CRM.Core.Extensions.XML;

    [XMLName("r")]
    public class NotificationMessageUpdateResult
    {
        public int NotificationId { get; set; }
        public int ConversationGroupId { get; set; }
        public DateTime SentDate { get; set; }
        public string Status { get; set; }
        public string ErrMsg { get; set; }
    }
}