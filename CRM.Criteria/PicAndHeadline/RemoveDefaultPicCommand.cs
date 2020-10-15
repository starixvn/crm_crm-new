namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class RemoveDefaultPicCommand : NonQueryCommand
    {
        public int HeadlineId { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_PicDefaultDel";
        }

        public override bool IsValid() => HeadlineId >= 0;
    }
}