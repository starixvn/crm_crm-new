namespace CRM.BackgroundJob.Criteria.TurnoverControll
{
    using Fanex.Data.Repository;
    public class EditTOControl_AutoFeedbackInfoUpdCommand : NonQueryCommand
    {
        public int CustID { get; set; }
        public int MatchID { get; set; }
        public int ProfileID { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

        public override string GetSettingKey() => "Acc_CRM_TOControl_AutoFeedbackInfoUpd";

        public override bool IsValid() => CustID > 0 && MatchID > 0 && ProfileID > 0 && !string.IsNullOrWhiteSpace(Status);
    }
}
