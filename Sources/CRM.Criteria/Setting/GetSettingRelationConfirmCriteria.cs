namespace CRM.Criteria.Setting;

using Fanex.Data.Repository;

public class GetSettingRelationConfirmCriteria : CriteriaBase
{
    public string SettingID { get; set; }

    public int ParentID { get; set; }

    public string SettingName { get; set; }

    public override string GetSettingKey() => "Acc_CRM_SettingRelationConfirm";

    public override bool IsValid() => true;
}