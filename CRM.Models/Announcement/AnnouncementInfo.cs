namespace CRM.Models.Announcement
{
    using System;
    using System.Collections.Generic;

    public class AnnouncementInfo
    {
        public int AnnouncementId { get; set; }
        public string NotificationTemplateName { get; set; }
        public int NotificationTemplateId { get; set; }
        public DateTime SendDate { get; set; }
        public string SendDateString => SendDate.ToString("MMM dd, yyyy");
        public string SendTimeString => SendDate.ToString("hh:mm:ss tt");
        public string CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public List<String> ImageSource { get; set; }
        public string GroupHeadlines { get; set; }
        public string HeadlineType { get; set; }
        public string Sites { get; set; }
        public string Currencies { get; set; }
    }
}
