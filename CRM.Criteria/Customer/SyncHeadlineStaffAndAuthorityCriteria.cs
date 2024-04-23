namespace CRM.Criteria.Customer
{
    using CRM.Core.Models;
    public class SyncHeadlineStaffAndAuthorityCriteria : BaseNonQueryCommand
    {
        public int UserID { get; set; }
        public int HeadlineID { get; set; }
        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_SyncHeadlineStaffAndAuthority";

        public override bool IsValid() => UserID > 0 && !string.IsNullOrWhiteSpace(IP) && HeadlineID > 0;
    }
}
