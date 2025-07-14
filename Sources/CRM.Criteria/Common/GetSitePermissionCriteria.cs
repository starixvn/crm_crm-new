using Fanex.Data.Repository;

namespace CRM.Criteria.Common;

public class GetSitePermissionCriteria : CriteriaBase
{
    public short UserRole { get; set; } = Constants.Constants.UserRole;

    public short LicenseeType { get; set; } = (short)Enum.SitePermission.Both;

    public string SitePermission { get; set; }

    public override string GetSettingKey() => "Acc_CRM_SitePermissionSel";

    public override bool IsValid() => true;
}