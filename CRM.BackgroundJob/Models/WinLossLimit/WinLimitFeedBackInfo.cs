namespace CRM.BackgroundJob.Models.WinLossLimit
{
    using System;

    public class WinLimitFeedBackInfo
    {
        public int LogId { get; set; }
        public string CustID { get; set; }
        public int HeadlineID { get; set; }
        public int RelatedCustID { get; set; }
        public byte LevelID { get; set; }
        public double MaxWinLimitSetting { get; set; }
        public double TotalWinAmt { get; set; }
        public double TotalWinAmt_RM { get; set; }
        public DateTime ReachedTime { get; set; }
        public string BettypeIDList { get; set; }
    }
}
