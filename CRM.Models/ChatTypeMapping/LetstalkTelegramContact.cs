namespace CRM.Models.ChatTypeMapping
{
    using Newtonsoft.Json;

    public class LetstalkTelegramContact
    {
        [JsonProperty(PropertyName = "display_name")]
        public string DisplayName { get; set; }

        [JsonProperty(PropertyName = "first_name")]
        public string FirstName { get; set; }

        [JsonProperty(PropertyName = "last_name")]
        public string LastName { get; set; }

    }
}