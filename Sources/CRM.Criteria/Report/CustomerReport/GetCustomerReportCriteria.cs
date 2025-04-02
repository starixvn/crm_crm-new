namespace CRM.Criteria.Report.CustomerReport;

using Constants;
using Fanex.Data.Repository;

public class GetCustomerReportCriteria : CriteriaBase
{
    public string Username { get; set; }

    public string Headline { get; set; }

    public int Vip { get; set; }

    public string LanguageId { get; set; }

    public string SiteId { get; set; }

    public string RoleId { get; set; }

    public bool ExcludeIgnoredAcc { get; set; }

    public int PageIndex { get; set; }

    public int PageSize { get; set; }

    public int TotalRows { get; set; }

    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_Crm_Rpt_CustomerReport";

    public override bool IsValid() => true;
}