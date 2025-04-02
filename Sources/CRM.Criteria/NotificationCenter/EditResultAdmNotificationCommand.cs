namespace CRM.Criteria.NotificationCenter;

using Fanex.Data;
using Models;

public class EditResultAdmNotificationCommand : BaseNonQueryCommand
{
    public int NotiID { get; set; }

    public string NewStatus {  get; set; }

    public string NewSubject { get; set; }

    public string NewContentEN { get; set; }

    public string NewContentCH { get; set; }

    public string NewContentCS { get; set; }

    public string NewContentZHCN { get; set; }

    public int UpdaterID { get; set; }

    public string Remark { get; set; }

    [SpParam(AllowNull = true)]
    public string Filename { get; set; }

    public override string GetSettingKey() => "MNC_Notification_AdmUpdNoti";

    public override bool IsValid() => true;
}