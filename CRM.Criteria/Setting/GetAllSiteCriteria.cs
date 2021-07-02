namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllSiteCriteria : CriteriaBase
    {
        public byte UserRole { get; } = Constants.UserRole;

        public byte LicenseeType { get; } = LicenseeTypeConstants.All;

        public override string GetSettingKey() => "Acc_CRM_SiteSel";

        public override bool IsValid() => true;
    }
}