namespace CRM.Criteria.Announcement;

using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Models.Announcement;
using Extensions.XML;
using Fanex.Data;
using Microsoft.AspNetCore.Http;
using Models;

public class ValidateAnnouncementCommand : BaseNonQueryCommand
{
    [SpParam(Ignored = true)]
    public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();
    [SpParam(Ignored = true)]
    public IList<string> FileString { get; set; } = new List<string>();
    public string HeadlineNameList { get; set; }
    public string SiteNameList { get; set; }
    public string CurrencyList { get; set; }
    public string HeadlineType { get; set; }
    [SpParam(Ignored = true)]
    public IList<Content> Contents { get; set; } = new List<Content>();
    [SpParam(SqlParamName = "contents")]
    public string ContentXml => Contents.Any() ? Contents.ToXML("Contents").ToString() : string.Empty;
    [SpParam(Ignored = true)]
    public DateTime? SendDate { get; set; }
    [SpParam(Ignored = true)]
    public bool SendImmediately { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ChatBot_Announcement_Validation";

    public override bool IsValid() => true;
}