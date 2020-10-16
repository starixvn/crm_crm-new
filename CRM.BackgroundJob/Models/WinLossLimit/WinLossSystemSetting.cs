namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using Fanex.CRM.BackgroundJob.Models;

    public class WinLossSystemSetting : AbnormalBetSystemSetting
    {
        public int LastLogID { get; set; }
        public byte IsCredit { get; set; }
        public byte IsDeposit { get; set; }
    }
}
