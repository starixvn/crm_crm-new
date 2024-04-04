namespace CRM.Criteria.Customer
{
    using System.Collections.Generic;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.Customer;
    using Fanex.Data;

    public class UpdateHeadlineStaffAndAuthorityCommand : BaseNonQueryCommand
    {
        public int HeadlineID { get; set; }
        public int UserID { get; set; }
        public string IP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<StaffAndAuthority> HeadlineStaffsAndAuthority { get; set; }
        public string StaffAndAuthority => XMLIO.ToXML(HeadlineStaffsAndAuthority, "ROOT").ToString();

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdHeadlineStaffAndAuthority";

        public override bool IsValid() => HeadlineID > 0 && UserID > 0 && !string.IsNullOrWhiteSpace(IP);
    }
}
