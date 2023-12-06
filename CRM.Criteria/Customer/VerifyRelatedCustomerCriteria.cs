namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;

    public class VerifyRelatedCustomerCriteria : BaseSitePermisionCriteria
    {
        public string Username { get; set; }

        public override string GetSettingKey() => "Acc_CRM_RelatedCustomerVerify";

        public override bool IsValid() => true;
    }
}