namespace CRM.Models.ChatTypeMapping
{
    using Newtonsoft.Json;

    public class LetstalkContact
    {
        [JsonProperty(PropertyName = "display_name")]
        public string DisplayName { get; set; }
    }
}