namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllLanguageCriteria : CriteriaBase
    {
        public byte Active { get; set; }
        public override string GetSettingKey()
        {
            return "Setting_SettingInfo_GetAllLanguage";
        }

        public short UserRole { get; } = Constants.UserRole;

        public override bool IsValid() => true;
    }
}