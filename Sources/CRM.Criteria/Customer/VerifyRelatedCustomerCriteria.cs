namespace CRM.Criteria.Customer;

public class VerifyRelatedCustomerCriteria : BaseSitePermissionCriteria
{
    public string Username { get; set; }

    public override string GetSettingKey() => "Acc_CRM_RelatedCustomerVerify";

    public override bool IsValid() => true;
}