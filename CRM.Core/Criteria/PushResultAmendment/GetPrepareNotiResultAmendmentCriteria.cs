namespace CRM.Core.Criteria.PushResultAmendment
{
    using Fanex.Data.Repository;

    public class GetPrepareNotiResultAmendmentCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "MNC_PushNotification_PrepareNoti";

        public override bool IsValid() => true;
    }
}
