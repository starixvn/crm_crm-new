namespace CRM.Criteria.AdminTool.SettingManagement
{
    using CRM.Core.Constants;
    using CRM.Core.Models;

    public class InsertNewSettingCommand : BaseNonQueryCommand
    {
        public byte UserRole { get; } = Constants.UserRole;
        public int UserId { get; set; }
        public string SettingName { get; set; }
        public string SettingValue { get; set; }
        public int DisplayOrder { get; set; }
        public int ParentId { get; set; }
        public string SettingSource { get; set; }

        public string IP { get; set; }
        public override string GetSettingKey()
        {
            return "Acc_CRM_SettingIns";
        }

        public override bool IsValid() => !string.IsNullOrEmpty(SettingName) && !string.IsNullOrEmpty(SettingValue);
    }
}
