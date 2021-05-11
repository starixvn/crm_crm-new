namespace CRM.BackgroundJob.Models.ProblemsAccount
{
    using CRM.BackgroundJob.Models.WinLossLimit;
    using System;

    public class ProblemsAccountSetting : WinLossSystemSetting
    {
        public string JobStatusUAT { get; set; }
        public int LastLogIdUAT { get; set; }
        public DateTime LastRuntimeUAT { get; set; }
    }
}
