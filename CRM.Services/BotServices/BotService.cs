namespace CRM.Services.BotServices
{
    using System.Net.Http;
    using CRM.Models.BotServices;
    using CRM.Services.BotServices.Interfaces;

    public class BotService : IBotService
    {
        private readonly BotServiceSettings botSettings;
        private readonly IHttpClientFactory httpClientFactory;

        public BotService(BotServiceSettings botSettings, IHttpClientFactory httpClientFactory)
        {
            this.botSettings = botSettings;
            this.httpClientFactory = httpClientFactory;
        }
    }
}