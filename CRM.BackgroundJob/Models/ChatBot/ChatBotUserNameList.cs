namespace CRM.BackgroundJob.Models.ChatBot
{
    using CRM.Core.Extensions.XML;
    using System;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;

    [Serializable]
    [XMLName("r")]
    public class ChatBotUserNameList: ChatBotVoidingMessage
    {
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
    }
}
