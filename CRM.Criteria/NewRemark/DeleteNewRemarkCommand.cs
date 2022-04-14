namespace CRM.Criteria.NewRemark
{
    using CRM.Core.Models;

    public class DeleteNewRemarkCommand : BaseNonQueryCommand
    {
        public int UserID { get; set; }
        public int RemarkID { get; set; }
        public string IP { get; set; }
        public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewDel";

        public override bool IsValid() => RemarkID > 0 && UserID > 0;
    }
}
