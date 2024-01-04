namespace CRM.Criteria.Customer
{
    using CRM.Core.Models;

    public class UpdateHeadlineCompanyServiceCommand : BaseNonQueryCommand
    {
        public int HeadlineID { get; set; }
        public int UserID { get; set; }
        public string IP { get; set; }

        public string CompanyServices { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdHeadlineCompanyService";

        public override bool IsValid() => HeadlineID > 0 && UserID > 0 && !string.IsNullOrWhiteSpace(IP) && !string.IsNullOrWhiteSpace(CompanyServices);
    }
}