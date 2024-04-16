namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class AssignPicCommand : NonQueryCommand
    {
        public int HeadlineId { get; set; }

        public string PicId { get; set; }

        public string DirectAccount { get; set; }

        public bool IsKeepAssign { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PICAssignment";

        public override bool IsValid() => HeadlineId >= 0 &&
            !string.IsNullOrWhiteSpace(PicId) &&
            !string.IsNullOrWhiteSpace(DirectAccount);
    }
}