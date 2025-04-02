namespace CRM.Criteria.Remark;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetRemarkCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_CustomerRemarkSel";

    public override bool IsValid() => true;
}