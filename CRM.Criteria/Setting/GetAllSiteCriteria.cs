namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllSiteCriteria : CriteriaBase
    {
        public short UserRole { get; set; }

        public short LicenseeType { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SiteSel";

        public override bool IsValid() => true;
    }
}