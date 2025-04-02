namespace CRM.Criteria.NotificationCenter;

using CRM.Models;

public class EditReasonAdmNotificationCommand : BaseNonQueryCommand
{
    public int NotiId { get; set; }
    public int ReasonId { get; set; }
    public int UpdaterId { get; set; }

    public override string GetSettingKey() => "MNC_Notification_AdmUpdNotiReason";

    public override bool IsValid() => NotiId > 0 && ReasonId > 0 && UpdaterId > 0;
}