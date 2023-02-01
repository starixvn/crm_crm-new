
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

    public class CreateAnnouncementCommand : BaseNonQueryCommand
    {
        [SpParam(Ignored = true)]
        public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();
        public int UserId { get; set; }
        public int NotificationTemplateId { get; set; }
        public string HeadlineNameList { get; set; }
        public string SiteNameList { get; set; }
        public string CurrencyList { get; set; }
        public string HeadlineType { get; set; }
        public string Title { get; set; }
        [SpParam(Ignored = true)]
        public Content Content { get; set; }
        [SpParam(Ignored = true)]
        public IEnumerable<Content> Contents => new List<Content> { Content };

        [SpParam(SqlParamName = "contents")]
        public string ContentXml => Contents.Any() ? Contents.ToXML("Contents").ToString() : string.Empty;
        public string FileName { get; set; }
        public string OrigFileName { get; set; }
        public DateTime? SendDate { get; set; }
        public bool SendImmediately { get; set; }
        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_Announcement_Ins";

        public override bool IsValid() => UserId > 0 && NotificationTemplateId > 0 && !string.IsNullOrEmpty(Title) && Contents.Count() > 0;
    }
}
