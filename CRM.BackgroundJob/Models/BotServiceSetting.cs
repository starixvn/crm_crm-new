namespace CRM.BackgroundJob.Models
{
    using System.Collections.Generic;
    using CRM.Core.Enumerables;

    public class BotServiceSetting
    {
        public int AppId { get; set; }
        public string ServiceUrl { get; set; }
        public List<ConversationConfig> ConversationConfigs { get; set; }
    }

    public class ConversationConfig
    {
        public BotChannel Channel {  get; set; }
        public string BotName { get; set; }
        public string ConversationId { get; set; }
    }
}
