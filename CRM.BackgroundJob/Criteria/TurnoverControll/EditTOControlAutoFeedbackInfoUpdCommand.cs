namespace CRM.BackgroundJob.Criteria.TurnoverControll
{
    using Fanex.Data.Repository;
    public class EditTOControlAutoFeedbackInfoUpdCommand : NonQueryCommand
    {
        public int LogID { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

        public override string GetSettingKey() => "Acc_CRM_TOControl_AutoFeedbackInfoUpd";

        public override bool IsValid() => LogID > 0 && !string.IsNullOrWhiteSpace(Status);
    }
}
