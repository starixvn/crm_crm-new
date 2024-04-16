namespace CRM.Criteria.AdminTool.SettingManagement
{
    using CRM.Core.Constants;
    using CRM.Core.Models;

    public class EditNewSettingCommand : BaseNonQueryCommand
    {
        public byte UserRole { get; } = Constants.UserRole;
        public int UserId { get; set; }
        public string SettingName { get; set; }
        public string ExtraInfo { get; set; }
        public string SettingValue { get; set; }
        public int DisplayOrder { get; set; }
        public int SettingId { get; set; }
        public string SettingSource { get; set; }

        public string IP { get; set; }
        public override string GetSettingKey() => "Acc_CRM_SettingUpd";

        public override bool IsValid() => SettingId > 0 && !string.IsNullOrEmpty(SettingName) && !string.IsNullOrEmpty(SettingValue);
    }
}
