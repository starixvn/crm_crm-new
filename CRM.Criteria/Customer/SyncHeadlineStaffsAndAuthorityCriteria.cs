namespace CRM.Criteria.Customer
{
    using CRM.Core.Models;
    public class SyncHeadlineStaffsAndAuthorityCriteria : BaseNonQueryCommand
    {
        public int UserID { get; set; }
        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_SyncHeadlineStaffsAndAuthority";

        public override bool IsValid() => UserID > 0 && !string.IsNullOrWhiteSpace(IP);
    }
}
