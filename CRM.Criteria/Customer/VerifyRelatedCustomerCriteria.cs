namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class VerifyRelatedCustomerCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey()
        {
            return "Acc_CRM_RelatedCustomerVerify";
        }

        public override bool IsValid() => true;
    }
}