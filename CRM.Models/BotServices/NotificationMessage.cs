namespace CRM.Models.BotServices
{
    using CRM.Core.Enumerables;

    public class NotificationMessage
    {
        public int NotificationId { get; set; }
        public int BotId { get; set; }
        public ChatType ChatType { get; set; }
        public BotChannel Channel { get; set; }
        public NotificationMessageType MessageType { get; set; }
        public string ConversationId { get; set; }
        public string Content { get; set; }
        public string[] Images { get; set; }
    }
}