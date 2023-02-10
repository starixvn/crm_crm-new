
namespace CRM.Criteria.Announcement
{
    using System.Collections.Generic;
    using CRM.Core.Extensions.XML;
    using System.Linq;
    using CRM.Models.Announcement;
    using Fanex.Data;
    using Microsoft.AspNetCore.Http;
    using System;
    using CRM.Core.Models;

    public class EditAnnouncementCommand : BaseNonQueryCommand
    {
        public int AnnouncementId { get; set; }
        [SpParam(Ignored = true)]
        public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();
        [SpParam(Ignored = true)]
        public IList<string> FileStringRemove { get; set; } = new List<string>();
        [SpParam(Ignored = true)]
        public IList<string> FileString { get; set; } = new List<string>();
        public string Title { get; set; }
        [SpParam(Ignored = true)]
        public IList<Content> Contents { get; set; }

        [SpParam(SqlParamName = "contents")]
        public string ContentXml => Contents.Any() ? Contents.ToXML("Contents").ToString() : string.Empty;
        public string FileName { get; set; }
        public int UserId { get; set; }
        public int NotificationTemplateId { get; set; }
        public string HeadlineNameList { get; set; }
        public string SiteNameList { get; set; }
        public string CurrencyList { get; set; }
        public string HeadlineType { get; set; }
        public DateTime? SendDate { get; set; }
        public bool SendImmediately { get; set; }
        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_Announcement_Upd";

        public override bool IsValid() => IsValidParams() && NotificationTemplateId > 0 && !string.IsNullOrEmpty(Title) && Contents.Any();

        public bool IsValidParams() => AnnouncementId > 0 && UserId > 0;
    }
}
