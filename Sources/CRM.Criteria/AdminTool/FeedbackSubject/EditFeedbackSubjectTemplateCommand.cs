namespace CRM.Criteria.AdminTool.FeedbackSubject;

using Constants;
using Models;

public class EditFeedbackSubjectTemplateCommand : BaseNonQueryCommand
{
    public int TemplateId { get; set; }

    public string Subject { get; set; }

    public byte UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_SubjectTemplateUpd";

    public override bool IsValid() => true;
}