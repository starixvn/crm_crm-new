namespace CRM.Models.Announcement
{
    using System;

    public class AnnouncementInfo
    {
        public int AnnouncementId { get; set; }
        public string NotificationTemplate { get; set; }
        public string SendDateString { get; set; }
        public string SendTimeString { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Content { get; set; }
        public string ImageSource { get; set; }
        public string GroupHeadline { get; set; }
    }
}
