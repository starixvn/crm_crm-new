namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    using System;
    using CRM.Core.Extensions.XML;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;

    [Serializable]
    [XMLName("r")]
    public class TargetMessageInfo: ChatBotVoidingTicketInfo
    {
        [XMLName("Username")]
        public string Username { get; set; }
    }
}
