namespace CRM.Models.InformHeadline;

using System;

public class RemovedAccountLog
{
    public int LogId { get; set; }

    public DateTime LogDate { get; set; }

    public string ClientLogDate { get; set; }

    public string Username { get; set; }

    public int Totals { get; set; }
}