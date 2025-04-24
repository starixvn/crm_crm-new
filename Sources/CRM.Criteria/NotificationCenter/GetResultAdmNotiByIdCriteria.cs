namespace CRM.Criteria.NotificationCenter;

public class GetResultAdmNotiByIdCriteria : BaseSitePermissionCriteria
{
    public int NotiID { get; set; }

    public override string GetSettingKey() => "MNC_Notification_AdmSelNotiDetail";

    public override bool IsValid() => true;
}