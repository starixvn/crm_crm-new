namespace CRM.Models.Report.SettlementReport;

using System;

[Serializable]
public class SettlementReportEntity
{
    public int Month { get; set; }

    public int CountryId { get; set; }

    public string CountryName { get; set; }

    public int NoOfIssues { get; set; }
}