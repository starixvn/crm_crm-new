using System;

namespace CRM.Models.Announcement;

public class AnnouncementDetail
{
    public int NotificationTemplateId { get; set; }
    public string NotificationTemplateName { get; set; }
    public string Title { get; set; }
    public string HeadlineNameList { get; set; }
    public int? HeadlineType{ get; set; }
    public string SiteNameList { get; set; }
    public string CurrencyIdList { get; set; }
    public bool SendImmediately { get; set; }
    public DateTime? SendDate { get; set; }
    public string SendDateString { get; set; }
    public string SendTimeString { get; set; }
    public string DirectAccounts { get; set; }
    public string CurrencyList { get; set; }
    public string DirectAccountList { get; set; }
    public int Code { get; set; } = 1;
    public string Message { get; set; } = "Invalid data.";
    public bool IsSuccessful => Code == 0;
    public string UploadFileType { get; set; }
}