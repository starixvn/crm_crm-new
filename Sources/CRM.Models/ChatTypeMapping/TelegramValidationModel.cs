namespace CRM.Models.ChatTypeMapping;

using System.Collections.Generic;

public class TelegramValidationModel
{
    public bool IsBotRemoved { get; set; }
    public List<TelegramAccountInGroup> Telegrams { get; set; }
}

public class TelegramAccountInGroup
{
    public string ChatId { get; set; }
    public bool IsGroupMember { get; set; }
}