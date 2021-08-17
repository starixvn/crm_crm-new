namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    using System;
    using global::CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class TargetMessage
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("MsgTargetId")]
        public int MsgTargetId { get; set; }
        [XMLName("Type")]
        public string Type { get; set; }
    }
}
