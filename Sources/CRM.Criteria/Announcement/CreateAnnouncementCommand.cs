
namespace CRM.Criteria.Announcement;

using System.Collections.Generic;
using System.Linq;
using CRM.Models.Announcement;
using Fanex.Data;
using Microsoft.AspNetCore.Http;
using System;
using Extensions.XML;
using Models;

public class CreateAnnouncementCommand : BaseNonQueryCommand
{
    [SpParam(Ignored = true)]
    public int CloneAnnouncementId { get; set; }
    [SpParam(Ignored = true)]
    public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();
    [SpParam(Ignored = true)]
    public IList<string> FileString { get; set; } = new List<string>();
    public int UserId { get; set; }
    public int NotificationTemplateId { get; set; }
    public string HeadlineNameList { get; set; }
    public string SiteNameList { get; set; }
    public string CurrencyList { get; set; }
    public string HeadlineType { get; set; }
    public string Title { get; set; }
    [SpParam(Ignored = true)]
    public IList<Content> Contents { get; set; } = new List<Content>();

    [SpParam(SqlParamName = "contents")]
    public string ContentXml => Contents.Any() ? Contents.ToXML("Contents").ToString() : string.Empty;
    public DateTime? SendDate { get; set; }
    public bool SendImmediately { get; set; }
    public string Status { get; set; }
    public string LoginIP { get; set; }

    public int AnnouncementId { get; set; }

    public string UploadFileType { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ChatBot_Announcement_Ins";

    public override bool IsValid() => UserId > 0;
}