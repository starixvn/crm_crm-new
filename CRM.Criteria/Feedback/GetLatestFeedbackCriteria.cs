namespace CRM.Criteria.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using Fanex.Data.Repository;

    public class GetLatestFeedbackCriteria : CriteriaBase
    {
        public int Top { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public short LicenseeType { get; set; } = (short)SitePermission.Both;

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelTop";

        public override bool IsValid() => Top > 0;
    }
}