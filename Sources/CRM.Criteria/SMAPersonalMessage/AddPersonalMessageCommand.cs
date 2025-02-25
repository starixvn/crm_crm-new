namespace CRM.Criteria.SMAPersonalMessage
{
    using CRM.Core.Models;

    public class AddPersonalMessageCommand : BaseNonQueryCommand
    {
        public string Title { get; set; }
        public string CustList { get; set; }
        public string Content_en { get; set; }
        public string Content_cs { get; set; }
        public string Content_ch { get; set; }
        public string Content_th { get; set; }
        public string Content_vn { get; set; }
        public int Creator { get; set; }
        public string CreatorName { get; set; }
        public string IP { get; set; } = string.Empty;
        public override string GetSettingKey() => "Acc_CRM_PersonalMessageIns";

        public override bool IsValid() => !string.IsNullOrEmpty(Content_en) && !string.IsNullOrEmpty(CustList);
    }
}
