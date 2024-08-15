namespace CRM.BackgroundJob.Criteria.SendNotificationCenter
{
    using CRM.BackgroundJob.Core.Models;

    public class InsertNotificationAlertCommand : BaseNonQueryCommand
    {
        public override string GetSettingKey() => "MNC_Notification_AlertIns";

        public override bool IsValid() => true;
    }
}