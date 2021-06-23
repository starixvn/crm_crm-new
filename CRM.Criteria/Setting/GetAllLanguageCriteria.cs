namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllLanguageCriteria : CriteriaBase
    {
        public byte Active { get; set; }
        public byte UserRole { get; } = Constants.UserRole;
        public override string GetSettingKey()
        {
            return "Acc_CRM_LanguageList";
        }

        public short UserRole { get; } = Constants.UserRole;

        public override bool IsValid() => true;
    }
}