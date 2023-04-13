namespace CRM.Models.BotServices
{
    using System;
    using CRM.Core.Enumerables;

    public class SendResult
    {
        public int NotificationId { get; set; }
        public BotChannel Channel { get; set; }
        public string ConversationId { get; set; }
        public DateTime SentTime { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public bool IsSuccessful => ErrorCode == 0;
        public bool IsIgnoreRetry { get; set; }
        public bool IsBlockedBot { get; set; }
    }
}