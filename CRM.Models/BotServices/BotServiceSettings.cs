namespace CRM.Models.BotServices
{
    public class BotServiceSettings
    {
        public string ServiceUrl { get; set; }
        public string AppId { get; set; }
        public string Token { get; set; }
        public int RefreshTokenByDays { get; set; }
    }
}