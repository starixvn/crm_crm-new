namespace CRM.Criteria
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using Fanex.Data.Repository;

    public abstract class BaseSitePermisionCriteria : CriteriaBase
    {
        public short UserRole { get; set; } = Constants.UserRole;
        public short LicenseeType { get; set; } = (short)SitePermission.Both;
        public string SiteLabel { get; set; }
    }
}