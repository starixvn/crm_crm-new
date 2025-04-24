namespace CRM.Models.ChatTypeMapping;

using System.Collections.Generic;
using Enum;
using Extensions;

public class ChatTypeMappingModel
{
    public int ChatTypeId { get; set; }

    public string ChatType => EnumHelper.GetDescription((ChatType)ChatTypeId);

    public long BotId { get; set; }

    public string BotName { get; set; }

    public int ChannelId { get; set; }

    public string ChannelName { get; set; }

    public int ConversationGroupId { get; set; }

    public string ConversationId { get; set; }

    public string LetstalkID_Username { get; set; }

    public string DisplayName { get; set; }

    public int MappingStatusId { get; set; }

    public string MappingStatus => EnumHelper.GetDescription((MappingStatus)MappingStatusId);

    public int LanguageId { get; set; }

    public string Language { get; set; }

    public bool IsActive { get; set; }

    public string Remark { get; set; }

    public bool IsTest { get; set; }

    public string IgnoredNotificationTypeList { get; set; }

    public IEnumerable<ConversationRecipient> Recipients { get; set; }

    public IEnumerable<ConversationHeadlineModel> Headlines { get; set; }
}