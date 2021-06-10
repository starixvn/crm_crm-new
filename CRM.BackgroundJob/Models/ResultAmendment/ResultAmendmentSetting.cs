namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using CRM.BackgroundJob.Models.WinLossLimit;
    using System;

    public class ResultAmendmentSetting : WinLossSystemSetting
    {
        public int BatchSizeTicket { get; set; }
        public int LastTicketID { get; set; }
        public int LastTicketIDUAT { get; set; }
        public string JobStatusUAT { get; set; }
        public int LastLogIdUAT { get; set; }
        public DateTime LastRuntimeUAT { get; set; }
    }
}
