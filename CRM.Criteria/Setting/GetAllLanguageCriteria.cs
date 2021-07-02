namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllLanguageCriteria : CriteriaBase
    {
        public byte Active { get; set; }
        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_LanguageList";

        public override bool IsValid() => true;
    }
}