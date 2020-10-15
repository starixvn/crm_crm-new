namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllProvinceCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_ProvinceSel";
        }

        public override bool IsValid() => true;
    }
}