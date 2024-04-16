namespace CRM.Criteria.PicAndHeadline
{
    using CRM.Core.Models;

    public class RemoveAssignmentCommand : BaseNonQueryCommand
    {
        public string RemovedPICs { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PICAssignmentDel";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(RemovedPICs);
    }
}