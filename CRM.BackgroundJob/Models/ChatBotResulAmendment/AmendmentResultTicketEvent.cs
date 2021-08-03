namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    public class AmendmentResultTicketEvent
    {
        public int TicketId { get; set; }
        public int TicketEventId { get; set; }
        public int Seq { get; set; }
        public string Username { get; set; }
        public int CustId { get; set; }
        public int Recommend { get; set; }
        public int Mrecommend { get; set; }
        public int Srecommend { get; set; }
        public int IsTest { get; set; }
    }
}
