namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using System;
    using Fanex.CRM.BackgroundJob.Models;

    public class WinLossSystemSetting : AbnormalBetSystemSetting
    {
        public int LastLogID { get; set; }
        public bool IsCredit { get; set; }
        public bool IsDeposit { get; set; }
    }
}
