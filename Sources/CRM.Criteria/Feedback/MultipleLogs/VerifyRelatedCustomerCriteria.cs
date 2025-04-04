namespace CRM.Criteria.Feedback.MultipleLogs;

public class VerifyRelatedCustomerCriteria : BaseSitePermissionCriteria
{
    public string HeadlineIds { get; set; }
    public string Username { get; set; }

    public override string GetSettingKey() => "CRM_MultipleLogs_VerifyRelatedCustomer";

    public override bool IsValid() => !string.IsNullOrWhiteSpace(HeadlineIds) && !string.IsNullOrWhiteSpace(Username);
}