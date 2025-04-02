namespace CRM.Criteria.Customer;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class UpdateCustomerSuggestionCriteria : NonQueryCommand
{
    public int UserID { get; set; }
    public int CustID { get; set; }
    public string UserName { get; set; }
    public short UserRole { get; } = Constants.UserRole;

    [SpParam(Ignored = true)]
    public int ErrCode { get; set; }
    [SpParam(Ignored = true)]
    public string ErrMsg { get; set; }
    public override string GetSettingKey() => "Acc_CRM_CustomerUpdUserSearch";

    public override bool IsValid() => true;
}