namespace CRM.Criteria;

using Constants;
using Fanex.Data.Repository;

public abstract class BaseSitePermisionCriteria : CriteriaBase
{
    public short UserRole { get; set; } = Constants.UserRole;
    public short LicenseeType { get; set; } = (short)Enum.SitePermission.Both;
    public string SitePermission { get; set; }
}