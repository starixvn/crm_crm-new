namespace CRM.Criteria.ChatTypeMapping;

using Fanex.Data.Repository;

public class GetIgnoredNotificationTypeCriteria : CriteriaBase
{
    public override string GetSettingKey() => "Acc_CRM_ChatBot_IgnoredNotificationType_Sel";

    public override bool IsValid() => true;
}