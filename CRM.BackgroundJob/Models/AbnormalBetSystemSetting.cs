namespace Fanex.CRM.BackgroundJob.Models
{
    using System;

    public class AbnormalBetSystemSetting
    {
        public string JobStatus { get; set; }
        public int BatchSize { get; set; }
        public bool ConfigUAT { get; set; }
        public bool ConfigPRO { get; set; }
        public bool ServiceFlag { get; set; }
        public long LastLogId { get; set; }
        public bool IncludeUUSCurrency { get; set; }
        public DateTime LastRuntime { get; set; }
    }
}