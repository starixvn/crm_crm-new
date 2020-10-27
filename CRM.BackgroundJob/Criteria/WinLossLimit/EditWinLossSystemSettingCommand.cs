namespace CRM.BackgroundJob.Criteria.WinLossLimit
{
    using Fanex.Data.Repository;

    public class EditWinLossSystemSettingCommand : NonQueryCommand
    {
        public string Settings { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SystemSettingByServiceUpd";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Settings);
    }
}
