namespace CRM.Criteria.Dashboard;

using Fanex.Data;
using Fanex.Data.Repository;

public class GetRedemptionLogsCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_MainInformationRedemptionSel";

    public override bool IsValid() => true;
}