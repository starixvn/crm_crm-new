namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using CRM.BackgroundJob.Models.WinLossLimit;
    public class ResultAmendmentSetting : WinLossSystemSetting
    {
        public int BatchSizeTicket { get; set; }
        public int LastTicketID { get; set; }
    }
}
