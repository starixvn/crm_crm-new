namespace CRM.Criteria.Customer;

using Constants;
using Fanex.Data.Repository;

public class GetUplineInfoOfUserCriteria : CriteriaBase
{
    public int CustId { get; set; }
    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_CustomerGetUplineList";

    public override bool IsValid() => true;
}