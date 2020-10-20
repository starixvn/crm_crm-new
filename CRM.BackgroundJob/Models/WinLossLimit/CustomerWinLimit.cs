namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using System;

    public class CustomerWinLimit
    {
        public int LogID { get; set; }
        public int CustID { get; set; }
        public int ProductID { get; set; }
        public string ProductGroup { get; set; }
        public string Level { get; set; }
        public byte LevelID { get; set; }
        public string MaxWinLimitSetting { get; set; }
        public decimal TotalWinAmt { get; set; }
        public decimal TotalWinAmt_RM { get; set; }
        public DateTime ReachedTime { get; set; }
        public string BettypeIDList { get; set; }
    }
}
