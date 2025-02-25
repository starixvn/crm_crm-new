namespace CRM.Criteria.PicAndHeadline
{
    using CRM.Core.Models;

    public class ChangePicStateCriteria : BaseNonQueryCommand
    {
        public int PicId { get; set; }

        public bool IsActive { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PICStatusUpd";

        public override bool IsValid() => PicId > 0;
    }
}
