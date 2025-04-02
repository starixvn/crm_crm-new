namespace CRM.Criteria.AdminTool.SettingManagement;

using Fanex.Data.Repository;

public class GetLicenseeManagerCriteria : CriteriaBase
{
    public string Username { get; set; }
    public override string GetSettingKey() => "Acc_CRM_LicenseeManagerSel";

    public override bool IsValid() => true;
}