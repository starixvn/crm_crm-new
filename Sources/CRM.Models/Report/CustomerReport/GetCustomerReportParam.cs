namespace CRM.Models.Report.CustomerReport;

public class GetCustomerReportParam
{
    public string Username { get; set; }

    public string Headline { get; set; }

    public int VipId { get; set; }

    public string LanguageIds { get; set; }

    public string SiteIds { get; set; }

    public string PositionIds { get; set; }

    public bool ExcludeIgnoredAccounts { get; set; }

    public int PageIndex { get; set; }

    public int PageSize { get; set; }
}