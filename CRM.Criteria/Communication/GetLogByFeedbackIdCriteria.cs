namespace CRM.Criteria.Communication
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;
    public class GetLogByFeedbackIdCriteria : CriteriaBase
    {
        public int FeedbackId { get; set; }
        public short UserRole { get; } = Constants.UserRole;
        public short Mode { get; } = 1;

        public override string GetSettingKey() => "Acc_CRM_CommunicationLogSel";

        public override bool IsValid() => true;
    }
}
