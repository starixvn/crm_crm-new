namespace CRM.Criteria.Customer;

using Fanex.Data;
using Fanex.Data.Repository;

public class CheckDirectAccountCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CheckDirectAccount";

    public override bool IsValid() => CustomerId > 0;
}