namespace CRM.BackgroundJob.Criteria.PushResultAmendment
{
    using CRM.Core.Models;

    public class GetPushResultAmendmentCommand : BaseNonQueryCommand
    {
        public int NotificationID { get; set; }

        public string JSNotification { get; set; }

        public int MessageID { get; set; }

        public override string GetSettingKey() => "MNC_PushNotification_MsgIns";

        public override bool IsValid() => true;
    }
}
