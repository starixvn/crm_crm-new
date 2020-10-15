namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetSettingRelationByNameCriteria : CriteriaBase
    {
        public string SettingName { get; set; }

        public int ParentID { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_SettingGetRelationBySettingName";
        }

        public override bool IsValid() => true;
    }
}