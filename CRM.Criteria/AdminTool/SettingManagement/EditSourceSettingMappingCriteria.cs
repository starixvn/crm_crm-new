namespace CRM.Criteria.AdminTool.SettingManagement
{
    using CRM.Core.Models;
    using Fanex.Data.Repository;

    public class EditSourceSettingMappingCriteria : NonQueryCommand
    {
        public int SettingID { get; set; }
        public string SettingSource { get; set; }
        public int UserId { get; set; }
        public string IP { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_SourceSettingMappingUpd";
        }

        public override bool IsValid() => true;
    }
}
