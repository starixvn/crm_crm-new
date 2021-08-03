namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    using System;
    using global::CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class AmendmentResultTicketEvent
    {
        [XMLName("TicketId")]
        public int TicketId { get; set; }
        [XMLName("TicketEventId")]
        public int TicketEventId { get; set; }
        [XMLName("Seq")]
        public int Seq { get; set; }
        [XMLName("CustId")]
        public int CustId { get; set; }
        [XMLName("Username")]
        public string Username { get; set; }
        [XMLName("Recommend")]
        public int Recommend { get; set; }
        [XMLName("Mrecommend")]
        public int Mrecommend { get; set; }
        [XMLName("Srecommend")]
        public int Srecommend { get; set; }
        [XMLName("IsTest")]
        public int IsTest { get; set; }
    }
}
