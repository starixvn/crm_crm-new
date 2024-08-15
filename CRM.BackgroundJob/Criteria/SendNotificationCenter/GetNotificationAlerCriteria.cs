namespace CRM.BackgroundJob.Criteria.SendNotificationCenter
{
    using Fanex.Data.Repository;

    public class GetNotificationAlerCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "MNC_Notification_AlertSel";

        public override bool IsValid() => true;
    }
}
