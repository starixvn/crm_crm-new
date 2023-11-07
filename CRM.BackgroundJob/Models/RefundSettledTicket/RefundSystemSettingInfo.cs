namespace CRM.BackgroundJob.Models.RefundSettledTicket
{
    using System;

    public class RefundSystemSettingInfo
    {
        public DateTime LastRuntime { get; set; }

        public string JobStatus { get; set; }

        public int BatchSize { get; set; }

        public int LastMsgTargetId { get; set; }

        public bool IncludeUUSCurency { get; set; }

        public bool ServiceFlag { get; set; }
    }
}
