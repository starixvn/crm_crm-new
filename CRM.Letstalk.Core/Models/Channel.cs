namespace CRM.BotService.Core.Models
{
    using CRM.Core.Enumerables;

    public class Channel
    {
        public BotChannel Name { get; set; }
        public bool IsActive { get; set; }
    }
}