namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllLicenseeTypeCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_LicenseeTypeSel";
        }

        public override bool IsValid() => true;
    }
}