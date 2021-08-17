using CRM.Core.Extensions.XML;

namespace Fanex.CRM.BackgroundJob.Models.ChatBot
{
    public class ChatBotVoidingTicketInfo
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("CustId")]
        public int CustId { get; set; }
        public string UsernameList { get; set; }
        [XMLName("Srecommend")]
        public string Srecommend { get; set; }
        [XMLName("Mrecommend")]
        public string Mrecommend { get; set; }
        [XMLName("Recommend")]
        public string Recommend { get; set; }
        [XMLName("IsTest")]
        public bool IsTest { get; set; }
        public byte Type { get; set; }
    }
}