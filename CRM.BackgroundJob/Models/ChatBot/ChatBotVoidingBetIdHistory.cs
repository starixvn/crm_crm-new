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

        [XMLName("BetTransId")]
        public string BetTransId { get; set; }

        [XMLName("MsgTargetId")]
        public int MsgTargetId { get; set; }

        [XMLName("TargetId")]
        public int TargetId { get; set; }
    }
}
