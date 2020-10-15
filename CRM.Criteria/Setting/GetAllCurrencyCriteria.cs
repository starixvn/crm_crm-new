namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllCurrencyCriteria : CriteriaBase
    {
        public GetAllCurrencyCriteria()
        {
            IsTest = true;
            Active = 1;
            OfferSite = 1;
        }

        public bool IsTest { get; set; }

        public int Active { get; set; }

        public int OfferSite { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_CurrencyList";
        }

        public override bool IsValid() => true;
    }
}