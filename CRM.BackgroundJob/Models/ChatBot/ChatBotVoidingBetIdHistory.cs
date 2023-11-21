namespace CRM.BackgroundJob.Models.ChatBot
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]

    public class ChatBotVoidingBetIdHistory
    {
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("MAXMsgTargetId")]
        public int MAXMsgTargetId { get; set; }
        [XMLName("ListBetTransId")]
        public string ListBetTransId { get; set; }
    }
}
