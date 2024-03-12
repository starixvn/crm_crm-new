namespace CRM.BackgroundJob.Criteria.PushResultAmendment
{
    using CRM.Core.Models;

    public class InsertCompleteResultAmendmentCommand : BaseNonQueryCommand
    {
        public override string GetSettingKey() => "MNC_PushNotification_Complete";

        public override bool IsValid() => true;
    }
}
