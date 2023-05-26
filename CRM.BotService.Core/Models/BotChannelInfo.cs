namespace CRM.BotService.Core.Models
{
    using CRM.Core.Enumerables;

    public class BotChannelInfo
    {
        public BotChannel Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsSendTest { get; set; }
        public long ChatIdTest { get; set; }
        public long ChatIdGroupTest { get; set; }
    }
}