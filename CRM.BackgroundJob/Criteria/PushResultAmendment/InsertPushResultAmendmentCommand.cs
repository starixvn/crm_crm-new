namespace CRM.BackgroundJob.Criteria.PushResultAmendment
{
    using CRM.Core.Models;

    public class InsertPushResultAmendmentCommand : BaseNonQueryCommand
    {
        public string NotificationIDs { get; set; }

        public string MessageIDs { get; set; }

        public override string GetSettingKey() => "MNC_CompletedPushNotification";

        public override bool IsValid() => true;
    }
}
