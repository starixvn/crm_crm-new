namespace CRM.Criteria.Feedback.MultipleLogs;

public class VerifyCustomerCriteria : BaseSitePermissionCriteria
{
    public string Username { get; set; }

    public override string GetSettingKey() => "CRM_MultipleLogs_VerifyCustomer";

    public override bool IsValid() => !string.IsNullOrWhiteSpace(Username);
}