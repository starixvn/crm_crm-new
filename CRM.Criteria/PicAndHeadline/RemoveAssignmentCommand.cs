namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class RemoveAssignmentCommand : NonQueryCommand
    {
        public string RemovedPICs { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public string ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_PICAssignmentDel";
        }

        public override bool IsValid() => !string.IsNullOrWhiteSpace(RemovedPICs);
    }
}