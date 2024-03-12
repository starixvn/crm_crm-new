namespace CRM.BackgroundJob.Criteria.PushResultAmendment
{
    using Fanex.Data.Repository;

    public class GetPreparePushNotificationCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "MNC_PushNotification_PrepareNoti";

        public override bool IsValid() => true;
    }
}
