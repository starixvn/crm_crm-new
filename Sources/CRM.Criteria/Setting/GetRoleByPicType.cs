namespace CRM.Criteria.Setting;

using Fanex.Data.Repository;

public class GetRoleByPicType : CriteriaBase
{
    public int PicType { get; set; }
    public override string GetSettingKey() => "Acc_CRM_PicRoleSel";

    public override bool IsValid() => true;
}