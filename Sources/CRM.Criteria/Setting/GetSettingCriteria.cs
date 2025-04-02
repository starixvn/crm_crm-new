namespace CRM.Criteria.Setting;

using Constants;
using Fanex.Data.Repository;

public class GetSettingCriteria : CriteriaBase
{
    public byte UserRole { get; } = Constants.UserRole;
    public string SettingName { get; set; }
    public bool? IsActive { get; set; }

    public override string GetSettingKey() => "Acc_CRM_SettingSel";

    public override bool IsValid() => true;
}