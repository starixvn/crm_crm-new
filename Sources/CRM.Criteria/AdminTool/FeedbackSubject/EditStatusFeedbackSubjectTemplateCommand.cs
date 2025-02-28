namespace CRM.Criteria.AdminTool.FeedbackSubject;

using Constants;
using Models;

public class EditStatusFeedbackSubjectTemplateCommand : BaseNonQueryCommand
{
    public byte UserRole { get; } = Constants.UserRole;

    public int TemplateId { get; set; }

    public bool IsActive { get; set; }

    public override string GetSettingKey() => "Acc_CRM_SubjectTemplateDel";

    public override bool IsValid() => true;
}