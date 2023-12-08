namespace CRM.BotService.Core.Models
{
    using System;

    [Serializable]
    public class JwtToken
    {
        public string Token { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public bool IsExpired => DateTimeOffset.UtcNow.DateTime >= ValidTo;
    }
}
