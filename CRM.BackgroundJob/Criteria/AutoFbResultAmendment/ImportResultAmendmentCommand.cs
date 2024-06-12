namespace CRM.BackgroundJob.Criteria.AutoFbResultAmendment
{
    using CRM.Core.Models;

    public class ImportResultAmendmentCommand : BaseNonQueryCommand
    {
        public string MsgInfo { get; set; }

        public string Environment { get; set; }

        public string IP { get; set; } = string.Empty;

        public override string GetSettingKey() => "Acc_CRM_AutoFB_ResultAmendment_Import";

        public override bool IsValid() => true;
    }
}
