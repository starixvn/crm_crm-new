namespace CRM.BackgroundJob.Criteria.VoidingBetID
{
    using CRM.Core.Models;

    public class ImportVoidBetIDCommand : BaseNonQueryCommand
    {
        public string Messages { get; set; }

        public string Environment { get; set; }

        public string IP { get; set; } = string.Empty;

        public override string GetSettingKey() => "Acc_CRM_AutoFB_VoidByBetID_Import";

        public override bool IsValid() => true;
    }
}
