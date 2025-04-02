namespace CRM.Criteria.Dashboard;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetCustomerInfoVerifyCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_MainInformationVerifySel";

    public override bool IsValid() => true;
}