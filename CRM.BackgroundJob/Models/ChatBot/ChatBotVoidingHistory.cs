namespace CRM.BackgroundJob.Models.ChatBot
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class ChatBotVoidingHistory
    {
        [XMLName("RequestID")]
        public int RequestID { get; set; }
        [XMLName("VoidingHistoryID")]
        public int VoidingHistoryID { get; set; }
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
    }
}
