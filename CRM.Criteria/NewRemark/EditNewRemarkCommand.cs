namespace CRM.Criteria.NewRemark
{
    using CRM.Core.Models;

    public class EditNewRemarkCommand : BaseNonQueryCommand
    {
        public int RemarkID { get; set; }
        public int CustID { get; set; }
        public string Remark { get; set; }
        public int? AcknowledgerID { get; set; } = null;
        public int RemarkTitle { get; set; }
        public string RelatedPICs { get; set; }
        public int? ApproverID { get; set; } = null;
        public int? Ext { get; set; } = null;
        public int? HandlerID { get; set; } = null;
        public string Requester { get; set; }
        public int ModifierID { get; set; }
        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewUpd";

        public override bool IsValid() => RemarkTitle > 0 && !string.IsNullOrEmpty(Remark);
    }
}
