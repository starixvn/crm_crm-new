namespace CRM.Criteria.Dashboard;

using Fanex.Data;

public class GetCommunicationLogsCriteria : BaseSitePermisionCriteria
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_MainInformationCommunicationLogSel";

    public override bool IsValid() => true;
}