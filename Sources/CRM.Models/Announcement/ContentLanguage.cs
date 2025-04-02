namespace CRM.Models.Announcement;

public class ContentLanguage
{
    public int NotificationTemplateId { get; set; }
    public int LanguageId { get; set; }
    public string Language { get; set; }
    public string Content { get; set; }
}