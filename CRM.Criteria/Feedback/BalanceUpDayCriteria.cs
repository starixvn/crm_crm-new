namespace CRM.Criteria.Feedback
{
    using Fanex.Data.Repository;

    public class BalanceUpDayCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Age_SelBalanceUpDay";
        }

        public override bool IsValid() => true;
    }
}
