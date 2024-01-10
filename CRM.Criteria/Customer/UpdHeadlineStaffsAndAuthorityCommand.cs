using System.Collections.Generic;
using CRM.Core.Extensions.XML;
using CRM.Core.Models;
using CRM.Models.Customer;

namespace CRM.Criteria.Customer
{
    public class UpdHeadlineStaffsAndAuthorityCommand : BaseNonQueryCommand
    {
        public int HeadlineID { get; set; }
        public int UserID { get; set; }
        public string IP { get; set; }
        public IEnumerable<StaffsAndAuthority> HeadlineStaffsAndAuthority { get; set; }
        public string StaffsAndAuthority => XMLIO.ToXML(HeadlineStaffsAndAuthority, "ROOT").ToString();

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdHeadlineStaffsAndAuthority";

        public override bool IsValid() => HeadlineID > 0 && UserID > 0 && !string.IsNullOrWhiteSpace(IP);
    }
}
