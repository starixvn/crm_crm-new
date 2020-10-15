namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllCountryCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_CountryList";
        }

        public override bool IsValid() => true;
    }
}