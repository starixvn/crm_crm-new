namespace CRM.Criteria.Setting;

using Constants;
using Fanex.Data.Repository;

public class GetSettingRelationByNameCriteria : CriteriaBase
{
    public string SettingName { get; set; }

    public int ParentID { get; set; }

    public byte Active { get; set; }

    public byte UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_SettingGetRelationBySettingName";

    public override bool IsValid() => true;
}