namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllSettingRelationCriteria : CriteriaBase
    {
        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_SettingRelationSel";

        public override bool IsValid() => true;
    }
}