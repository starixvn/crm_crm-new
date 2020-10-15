namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllBetTypeCriteria : CriteriaBase
    {
        public int ProductID { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_BetTypeList";
        }

        public override bool IsValid() => true;
    }
}