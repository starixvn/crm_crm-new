using Fanex.Data.Repository;

namespace CRM.Criteria.Announcement;

public class GetAnnouncementTemplateCriteria : CriteriaBase
{
    public override string GetSettingKey() => "Acc_CRM_ChatBot_AnnouncementNotificationTemplate_Sel";

    public override bool IsValid() => true;
}