namespace CRM.Criteria.Setting;

public class GetAllSiteCriteria : BaseSitePermissionCriteria
{
    public override string GetSettingKey() => "Acc_CRM_SiteSel";

    public override bool IsValid() => true;
}