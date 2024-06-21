namespace CRM.Criteria.NotificationCenter
{
    using CRM.Core.Models;

    public class EditResultAdmNotiStatusCommand : BaseNonQueryCommand
    {
        public int NotiID { get; set; }

        public string NewStatus { get; set; }

        public int UpdaterID { get; set; }

        public override string GetSettingKey() => "MNC_Notification_AdmUpdNotiSts";

        public override bool IsValid() => true;
    }
}
