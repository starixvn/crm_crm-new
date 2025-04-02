namespace CRM.Criteria.Customer;

using CRM.Models.Customer;
using Extensions.XML;
using Fanex.Data;
using Models;
using System.Collections.Generic;

public class UpdateHeadlineStaffAndAuthorityCommand : BaseNonQueryCommand
{
    public int HeadlineID { get; set; }
    public int UserID { get; set; }
    public string IP { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<StaffAndAuthority> HeadlineStaffsAndAuthority { get; set; }

    public string StaffAndAuthority => HeadlineStaffsAndAuthority.ToXML("ROOT").ToString();

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdHeadlineStaffAndAuthority";

    public override bool IsValid() => HeadlineID > 0 && UserID > 0 && !string.IsNullOrWhiteSpace(IP);
}