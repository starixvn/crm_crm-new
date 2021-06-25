
namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetFeedbackSubjectTemplateByIdCriteria : CriteriaBase
    {
        public int TemplateId { get; set; }
        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey()
        {
            return "Acc_CRM_SubjectTemplateSel";
        }

        public override bool IsValid() => true;
    }
}
