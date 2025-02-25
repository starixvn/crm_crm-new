namespace CRM.Models.Announcement
{
    public class NotificationTemplate
    {
        public int NotificationTemplateId { get; set; }
        public string NotificationTemplateName { get; set; }
        public int NotificationTypeId { get; set; }
        public string NotificationTypeName { get; set; }
        public string Title { get; set; }
    }
}