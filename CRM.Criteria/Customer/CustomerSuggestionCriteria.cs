namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class CustomerSuggestionCriteria : CriteriaBase
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public bool IsGuest { get; set; }
        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_CustomerSelUserSearch";

        public override bool IsValid() => true;
    }
}
