namespace CRM.Criteria.NotificationCenter;

public class GetSiteTicketByIdCriteria : BaseSitePermissionCriteria
{
    public int NotiID { get; set; }

    public override string GetSettingKey() => "MNC_Notification_AdmSelNotiTickets";

    public override bool IsValid() => true;
}