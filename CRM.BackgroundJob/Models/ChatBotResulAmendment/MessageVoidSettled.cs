namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]
    public class MessageVoidSettled
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("MsgTargetId")]
        public int MsgTargetId { get; set; }
        [XMLName("BetTransId")]
        public string BetTransId { get; set; }
    }
}
