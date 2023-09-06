namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using System;
    using CRM.BackgroundJob.Models.AbnormalBet;

    public class WinLossSystemSetting : AbnormalBetSystemSetting
    {
        public bool IsCredit { get; set; }
        public bool IsDeposit { get; set; }
    }
}
