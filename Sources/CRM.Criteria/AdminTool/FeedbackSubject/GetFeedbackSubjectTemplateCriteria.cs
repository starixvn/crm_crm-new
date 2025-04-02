namespace CRM.Criteria.AdminTool.FeedbackSubject;

using Constants;
using Fanex.Data.Repository;

public class GetFeedbackSubjectTemplateCriteria : CriteriaBase
{
    public int TemplateId { get; set; }
    public byte UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_SubjectTemplateSel";

    public override bool IsValid() => true;
}