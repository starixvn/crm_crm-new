namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllCurrencyRedemptionCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_CurrencyList_Redemption";
        }

        public override bool IsValid() => true;
    }
}