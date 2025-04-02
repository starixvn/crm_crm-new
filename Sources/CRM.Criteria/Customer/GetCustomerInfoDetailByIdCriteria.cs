namespace CRM.Criteria.Customer;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetCustomerInfoDetailByIdCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_CustomerSel_New";

    public override bool IsValid() => true;
}