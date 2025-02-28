namespace CRM.Models.Report.RedemptionStatistics;

using System;

public class RedemptionStatisticsDetailEntity
{
    public string Subject { get; set; }

    public DateTime ClaimTime { get; set; }

    public decimal Amount { get; set; }

    public string DoneBy { get; set; }

    public string Currency { get; set; }

    public int CurrencyId { get; set; }

    public string Status { get; set; }

    public string UserName { get; set; }
}