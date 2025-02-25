namespace CRM.Criteria.PicAndHeadline
{
    using CRM.Core.Models;

    public class ValidateAssignmentCriteria : BaseNonQueryCommand
    {
        public int HeadlineId { get; set; }

        public string PicId { get; set; }

        public string Username { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PICAssignmentValidation";

        public override bool IsValid() => HeadlineId >= 0 &&
            !string.IsNullOrWhiteSpace(PicId) &&
            !string.IsNullOrWhiteSpace(Username);
    }
}