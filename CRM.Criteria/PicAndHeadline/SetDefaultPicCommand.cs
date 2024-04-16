namespace CRM.Criteria.PicAndHeadline
{
    using CRM.Core.Models;

    public class SetDefaultPicCommand : BaseNonQueryCommand
    {
        public int HeadlineId { get; set; }

        public string DefaultPicIDs { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PicDefaultIns";

        public override bool IsValid() => HeadlineId >= 0 &&
            !string.IsNullOrWhiteSpace(DefaultPicIDs);
    }
}