namespace CRM.BackgroundJob.Models.TurnoverControll
{
    using System;
    public class TONotification
    {
        public int CustID { get; set; }
        public int MatchID { get; set; }
        public decimal MaxTurnOver { get; set; }
        public decimal TotalTurnover { get; set; }
        public decimal HouseTurnover { get; set; }
        public byte ReachLevel { get; set; }
        public string ProfileName { get; set; }
        public int Bettype { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
