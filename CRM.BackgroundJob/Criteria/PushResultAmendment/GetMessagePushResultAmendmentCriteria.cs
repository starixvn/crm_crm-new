namespace CRM.BackgroundJob.Criteria.PushResultAmendment
{
    using Fanex.Data.Repository;

    public class GetMessagePushResultAmendmentCriteria : CriteriaBase
    {
        public string MNC_Msg { get; set; }

        public string MNC_MsgTarget { get; set; }

        public override string GetSettingKey() => "MNC_PushNotification";

        public override bool IsValid() => true;
    }
}
