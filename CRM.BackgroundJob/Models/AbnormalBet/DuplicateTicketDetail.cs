namespace CRM.BackgroundJob.Models.AbnormalBet
{
    public class DuplicateTicketDetail
    {
        public int MessageId { get; set; }
        public int RequestID { get; set; }
        public string OrgTransIds { get; set; }
        public long VoidedTransId { get; set; }
        public string Username { get; set; }
        public int CustId { get; set; }
        public string Site { get; set;}
        public bool IsDeposit { get; set; }
        public bool IsTest { get; set; }
        public string bettype { get; set; }
    }
}
