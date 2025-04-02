namespace CRM.Models.Redemption;

using System;

public class LogInfo
{
    public int Id { get; set; }

    public string Subject { get; set; }

    public DateTime ClaimTime { get; set; }

    public int StatusId { get; set; }

    public string Remark { get; set; }

    public int CustId { get; set; }

    public string DoneBy { get; set; }

    public int CurrencyId { get; set; }

    public decimal Amount { get; set; }
}