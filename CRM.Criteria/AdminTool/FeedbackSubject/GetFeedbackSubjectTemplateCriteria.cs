namespace CRM.Criteria.FeedbackSubject
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetFeedbackSubjectTemplateCriteria : CriteriaBase
    {
        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey()
        {
            return "Acc_CRM_SubjectTemplateSel";
        }

        public override bool IsValid() => true;
    }
}