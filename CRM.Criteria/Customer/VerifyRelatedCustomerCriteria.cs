namespace CRM.Criteria.Customer
{
    public class VerifyRelatedCustomerCriteria : BaseSitePermisionCriteria
    {
        public string Username { get; set; }

        public override string GetSettingKey() => "Acc_CRM_RelatedCustomerVerify";

        public override bool IsValid() => true;
    }
}