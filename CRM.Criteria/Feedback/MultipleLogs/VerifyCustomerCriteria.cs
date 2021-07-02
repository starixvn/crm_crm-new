namespace CRM.Criteria.Feedback.MultipleLogs
{
    using Fanex.Data.Repository;

    public class VerifyCustomerCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public override string GetSettingKey() => "CRM_MultipleLogs_VerifyCustomer";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Username);
    }
}