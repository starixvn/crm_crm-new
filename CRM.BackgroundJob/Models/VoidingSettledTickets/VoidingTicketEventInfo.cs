namespace CRM.BackgroundJob.Models.VoidingSettledTickets
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]
    public class VoidingTicketEventInfo
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("TransId")]
        public long TransId { get; set; }
        [XMLName("CustID")]
        public int CustID { get; set; }
        [XMLName("UserName")]
        public string UserName { get; set; }
        [XMLName("HeadlineID")]
        public int HeadlineID { get; set; }
        [XMLName("HeadlineName")]
        public string HeadlineName { get; set; }
        [XMLName("MatchId")]
        public int MatchId { get; set; }
        [XMLName("MatchCode")]
        public string MatchCode { get; set; }
        [XMLName("EventDate")]
        public DateTime EventDate { get; set; }
        [XMLName("Bettype")]
        public int Bettype { get; set; }
        [XMLName("EventType")]
        public short EventType { get; set; }
        [XMLName("ProductID")]
        public int ProductID { get; set; }
        [XMLName("ListMsgTargetId")]
        public string ListMsgTargetId { get; set; }
    }
}
