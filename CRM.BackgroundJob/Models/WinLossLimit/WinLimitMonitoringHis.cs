namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using System;

    public class WinLimitMonitoringHis
    {
        public int CustID { get; set; }
        public byte ProductID { get; set; }
        public decimal MaxWinLimit { get; set; }
        public decimal TotalWinAmt { get; set; }
        public double WinAmt { get; set; }
        public byte LevelID { get; set; }
        public byte ActionID { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsNotified { get; set; }
        public int ModifiedBy { get; set; }
        public int CreatedBy { get; set; }
        public DateTime WinlostDate { get; set; }
        public long LogID { get; set; }
        public string MaxWinLimitSetting { get; set; }
        public int GroupID { get; set; }
        public string BettypeIDList { get; set; }
        public decimal TotalWinAmt_RM { get; set; }
    }
}
