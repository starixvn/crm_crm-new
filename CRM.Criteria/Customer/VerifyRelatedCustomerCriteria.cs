namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;

    public class VerifyRelatedCustomerCriteria : BaseSitePermisionCriteria
    {
        public string Username { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_RelatedCustomerVerify";

        public override bool IsValid() => true;
    }
}