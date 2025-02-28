namespace CRM.ViewModels.ChatTypeMapping;

public class PersonalMappingViewModel
{
    public int ConversationGroupId { get; set; }

    public long BotId { get; set; }

    public string DisplayName { get; set; }

    public string Username { get; set; }

    public int RecipientTypeId { get; set; }

    public string GroupHeadlineIds { get; set; }

    public string LetstalkId { get; set; }

    public int ChannelId { get; set; }

    public string ConversationId { get; set; }


    public string RecipientIds { get; set; }

    public int LanguageId { get; set; }

    public string Remark { get; set; }

    public string IgnoredNotificationTypeList { get; set; }

    public byte? IsTest { get; set; }
}