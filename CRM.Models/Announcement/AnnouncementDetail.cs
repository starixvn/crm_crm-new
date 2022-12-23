using System;

namespace CRM.Models.Announcement
{
    public class AnnouncementDetail
    {
        public int NotificationTemplateId { get; set; }
        public string NotificationTemplateName { get; set; }
        public string Title { get; set; }
        public string HeadlineNameList { get; set; }
        public string SiteNameList { get; set; }
        public string CurrencyIdList { get; set; }
        public string SendImmediately { get; set; }
        public DateTime SendDate { get; set; }
    }
}
