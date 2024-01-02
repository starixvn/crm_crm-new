namespace CRM.BackgroundJob.Models.ChatBot
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class ChatBotVoidingHistoryCollection
    {
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("IssueTypeId")]
        public int IssueTypeId { get; set; }
        [XMLName("TrasnIdList")]
        public string TrasnIdList { get; set; }
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
        [XMLName("FilterBy")]
        public int FilterBy { get; set; }
    }
}
