namespace CRM.BotService.Services.Models.Results
{
    using Newtonsoft.Json;

    public class WebhookResult : BaseResult
    {
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }
}