namespace CRM.Models.ChatTypeMapping;

using Newtonsoft.Json;
using Telegram.Bot.Types;

public class LetstalkTelegramContact
{
    [JsonProperty(PropertyName = "display_name")]
    public string DisplayName { get; set; }

    [JsonProperty(PropertyName = "first_name")]
    public string FirstName { get; set; }

    [JsonProperty(PropertyName = "last_name")]
    public string LastName { get; set; }

    [JsonProperty(PropertyName = "title")]
    public string DisplayGroupName { get; set; }

    public ChatPermissions Permissions { get; set; }

}