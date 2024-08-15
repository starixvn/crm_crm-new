namespace CRM.Criteria.NotificationCenter
{
    using CRM.Core.Models;

    public class EditResultAdmNotificationCommand : BaseNonQueryCommand
    {
        public int NotiID { get; set; }

        public string NewStatus {  get; set; }

        public string NewSubject { get; set; }

        public string NewContentEN { get; set; }

        public string NewContentCH { get; set; }

        public string NewContentCS { get; set; }

        public int UpdaterID { get; set; }

        public override string GetSettingKey() => "MNC_Notification_AdmUpdNoti";

        public override bool IsValid() => true;
    }
}
