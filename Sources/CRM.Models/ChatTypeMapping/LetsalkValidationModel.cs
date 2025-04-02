namespace CRM.Models.ChatTypeMapping;

using System.Collections.Generic;

public class LetsalkValidationModel
{
    public bool IsBotRemoved { get; set; }
    public List<LetstalkAccountInGroup> Letstalks { get; set; }
}

public class LetstalkAccountInGroup
{
    public string LetstalkId { get; set; }
    public bool IsGroupMember { get; set; }
    public bool IsBotFriend { get; set; }
}