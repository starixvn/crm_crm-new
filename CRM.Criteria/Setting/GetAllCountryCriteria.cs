namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllCountryCriteria : CriteriaBase
    {
        public byte Active { get; set; }
        public override string GetSettingKey()
        {
            return "Setting_SettingInfo_GetAllCountry";
        }
        public override bool IsValid() => true;
    }
}