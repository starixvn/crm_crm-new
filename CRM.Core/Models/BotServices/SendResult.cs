namespace CRM.Core.Models.BotServices
{
    using System;
    using System.Xml.Serialization;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;

    [XMLName("r")]
    public class SendResult
    {
        public int NotificationId { get; set; }
        public BotChannel Channel { get; set; }
        public string ConversationId { get; set; }
        public DateTime SentTime { get; set; }

        [XmlIgnore]
        public int ErrorCode { get; set; }

        [XmlIgnore]
        public string ErrorMessage { get; set; }

        [XmlIgnore]
        public bool IsSuccessful => ErrorCode == 0;

        [XmlIgnore]
        public bool IsIgnoreRetry { get; set; }

        [XmlIgnore]
        public bool IsBlockedBot { get; set; }

        public string Status
        {
            get
            {
                if (IsBlockedBot) { return "BotBlocked"; }
                if (IsSuccessful && !IsBlockedBot) { return "Sent"; }
                if (!IsSuccessful && !IsIgnoreRetry) { return "Retrying"; }
                return "Error";
            }
        }
    }
}