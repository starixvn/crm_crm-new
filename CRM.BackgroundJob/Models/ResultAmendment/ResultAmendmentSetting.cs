namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using CRM.BackgroundJob.Models.WinLossLimit;
    using System;

    public class ResultAmendmentSetting : WinLossSystemSetting
    {
        public int BatchSizeTicket { get; set; }
        public int LastSeq { get; set; }
        public int LastSeqUAT { get; set; }
        public DateTime LastSubmitDate { get; set; }
        public DateTime LastSubmitDateUAT { get; set; }
    }
}
