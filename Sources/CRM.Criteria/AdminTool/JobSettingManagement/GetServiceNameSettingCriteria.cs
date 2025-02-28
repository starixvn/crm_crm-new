namespace CRM.Criteria.AdminTool.JobSettingManagement;

using Fanex.Data.Repository;

public class GetServiceNameSettingCriteria : CriteriaBase
{
    public override string GetSettingKey() => "Acc_CRM_ConfigAutoFeedback_ServiceSel";

    public override bool IsValid() => true;
}