namespace CRM.Criteria.Setting;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetAllActionCriteria : CriteriaBase
{
    [SpParam(Ignored = true)]
    public int ActionType { get; set; }

    public override string GetSettingKey()
    {
        var settingKey = string.Empty;
        switch (ActionType)
        {
            case SettingConstants.ActivityLog:
                settingKey = "Acc_CRM_ActivityLogList";
                break;

            case SettingConstants.SettingLog:
                settingKey = "Acc_CRM_SettingLogList";
                break;
            default:
                // nothing
                break;
        }

        return settingKey;
    }

    public override bool IsValid() => true;
}