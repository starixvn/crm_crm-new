
namespace CRM.Criteria.AdminTool.SettingManagement
{
    using CRM.Core.Models;

    public class EditLicenseeMappingCommand : BaseNonQueryCommand
    {
        public int UserId { get; set; }
        public int SettingId { get; set; }
        public string SourceMapping { get; set; }
        public string LicenseeManager { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SourceLicenseeMappingUpd";

        public override bool IsValid() => SettingId > 0;
    }
}
