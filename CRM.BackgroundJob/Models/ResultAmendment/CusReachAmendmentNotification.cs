namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using System;
    using global::CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class CusReachAmendmentNotification
    {
        [XMLName("ticketid")]
        public int TicketId { get; set; }
        [XMLName("custid")]
        public int CustId { get; set; }
        [XMLName("ticketeventid")]
        public int TicketEventId { get; set; }
        [XMLName("bettype")]
        public short Bettype { get; set; }
    }
}
