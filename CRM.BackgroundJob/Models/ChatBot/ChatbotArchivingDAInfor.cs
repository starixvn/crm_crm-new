using CRM.Core.Extensions.XML;
using System;

namespace CRM.BackgroundJob.Models.ChatBot
{
    [Serializable]
    [XMLName("r")]
    public class ChatbotArchivingDAInfor
    {
        [XMLName("LogId")]
        public int LogId { get; set; }
        [XMLName("Username")]
        public string Username { get; set; }
        [XMLName("CustId")]
        public int CustId { get; set; }
        [XMLName("IsTest")]
        public bool IsTest { get; set; }
    }
}
