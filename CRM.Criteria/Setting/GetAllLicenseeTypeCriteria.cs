namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllLicenseeTypeCriteria : CriteriaBase
    {
        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_LicenseeTypeSel";

        public override bool IsValid() => true;
    }
}