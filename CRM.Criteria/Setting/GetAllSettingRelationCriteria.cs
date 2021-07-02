namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllSettingRelationCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_SettingRelationSel";

        public override bool IsValid() => true;
    }
}