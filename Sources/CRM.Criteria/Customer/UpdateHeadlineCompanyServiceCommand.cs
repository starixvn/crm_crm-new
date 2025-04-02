namespace CRM.Criteria.Customer;

using CRM.Models.Customer;
using Extensions.XML;
using Fanex.Data;
using Models;
using System.Collections.Generic;

public class UpdateHeadlineCompanyServiceCommand : BaseNonQueryCommand
{
    public int HeadlineID { get; set; }
    public int UserID { get; set; }
    public string IP { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<CompanyService> HeadlineCompanyServices { get; set; }

    public string CompanyServices => HeadlineCompanyServices.ToXML("ROOT").ToString();

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdHeadlineCompanyService";

    public override bool IsValid() => HeadlineID > 0 && UserID > 0 && !string.IsNullOrWhiteSpace(IP);
}