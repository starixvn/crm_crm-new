namespace CRM.Criteria.AdminTool.JobSettingManagement;

using Fanex.Data.Repository;

public class GetConfigSettingCriteria : CriteriaBase
{
    public string ServiceName { get; set; }
    public string Envr { get; set; }
    public string SettingName { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ConfigAutoFeedback_SettingSel";

    public override bool IsValid() => true;
}