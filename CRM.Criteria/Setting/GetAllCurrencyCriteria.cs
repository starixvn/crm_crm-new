namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllCurrencyCriteria : CriteriaBase
    {
        public bool IsTest { get; set; } = true;

        public byte Active { get; set; } = 1;

        public byte OfferSite { get; set; } = 1;

        public override string GetSettingKey() => "Acc_CRM_CurrencyList";

        public override bool IsValid() => true;
    }
}