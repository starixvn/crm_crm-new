namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllLanguageCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_LanguageList";
        }

        public override bool IsValid() => true;
    }
}