namespace CRM.BackgroundJob.Models.TurnoverControll
{
    public class TOControlFeedbackInfor : CustOutStanding
    {
        public int ProfileID { get; set; }
        public int HeadlineID { get; set; }
        public string HeadlineName { get; set; }
        public int RelatedCustID { get; set; }
        public string ProfileName { get; set; }
        public int Bettype { get; set; }
        public byte Level { get; set; }
        public decimal TotalTurnover { get; set; }
        public decimal MaxTurnover { get; set; }
        public decimal HouseTurnover { get; set; }
        public decimal Usage { get; set; }
        public string UserName { get; set; }
        public byte RoleID { get; set; }
        public string Currency { get; set; }
        public int HomeID { get; set; }
        public int AwayID { get; set; }
        public int LeagueID { get; set; }
        public int SportType { get; set; }
    }
}
