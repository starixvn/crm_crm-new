namespace CRM.Criteria.FeedbackSubject
{
    using CRM.Core.Constants;
    using CRM.Core.Models;

    public class CreateFeedbackSubjectTemplateCommand : BaseNonQueryCommand
    {
        public byte UserRole { get; } = Constants.UserRole;

        public string Subject { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SubjectTemplateIns";

        public override bool IsValid() => true;
    }
}