namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllSiteCriteria: CriteriaBase
    {
        public GetAllSiteCriteria()
        {
            LicenseeType = 0;
        }

        public short UserRole { get; } = Constants.UserRole;

        public int LicenseeType { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_SiteSel";
        }

        public override bool IsValid() => true;
    }
}
