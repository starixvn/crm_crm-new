namespace CRM.Models.NotificationCenter;

using System;

public class ResultAdmNotificationDetail
{
    public int NotificationID { get; set; }

    public int? MessageID { get; set; }

    public DateTime? EventTime { get; set; }

    public string EventName { get; set; }

    public string Content_en { get; set; }

    public string Content_ch { get; set; }

    public string Content_cs { get; set; }

    public string Content_zhcn { get; set; }

    public string Status { get; set; }

    public string Reason { get; set; }

    public int ReasonId { get; set; }

    public string Subject { get; set; }

    public string Remark { get; set; }

    public string Filename { get; set; }
}