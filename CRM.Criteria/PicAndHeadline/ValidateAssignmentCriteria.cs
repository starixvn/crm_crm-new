namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class ValidateAssignmentCriteria : CriteriaBase
    {
        public int HeadlineId { get; set; }

        public string PicId { get; set; }

        public string Username { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_PICAssignmentValidation";
        }

        public override bool IsValid() => HeadlineId >= 0 &&
            !string.IsNullOrWhiteSpace(PicId) &&
            !string.IsNullOrWhiteSpace(Username);
    }
}