namespace CRM.BackgroundJob.Criteria.VoidingBetID
{
    using Fanex.Data.Repository;

    public class ImportVoidBetIDCommand : NonQueryCommand
    {
        public string Message { get; set; }

        public string Environment { get; set; }

        public string IP { get; set; } = string.Empty;

        public override string GetSettingKey() => "Acc_CRM_AutoFB_VoidByBetID_Import";

        public override bool IsValid() => true;
    }
}
