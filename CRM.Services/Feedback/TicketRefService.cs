namespace CRM.Services.Feedback
{
    using System;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    public interface ITicketRefService
    {
        Task<TicketInfo> GetTicketByRefNoAsync(long refno);

        Task<DateTime> GetBalanceUpdayAsync();
    }

    public class TicketRefService : ITicketRefService
    {
        private readonly IBaseService baseService;
        private readonly IConfiguration configuration;

        public TicketRefService(IBaseService baseService, IConfiguration configuration)
        {
            this.baseService = baseService;
            this.configuration = configuration;
        }
        public async Task<TicketInfo> GetTicketByRefNoAsync(long refno)
        {
            var napUrl = configuration.GetSection("NapSettings:Url").Value;
            var apiKey = configuration.GetSection("NapSettings:APIKey").Value;
            CustomDelegatingHandler customDelegatingHandler = new CustomDelegatingHandler(apiKey);
            HttpClient client = HttpClientFactory.Create(customDelegatingHandler);
            var response = await client.GetAsync(napUrl + "BetListApi/GetBetListByRefNo?refno=" + refno);
            var jsonString = await response.Content.ReadAsStringAsync();
            return jsonString != null ? JsonConvert.DeserializeObject<TicketInfo>(jsonString) : await Task.FromResult<TicketInfo>(null);
        }

        public async Task<DateTime> GetBalanceUpdayAsync()
        {
            var criteria = new BalanceUpDayCriteria();
            var balance = await baseService.GetDataAsync<BalanceUpday>(criteria);
            return balance != null ? balance.FirstOrDefault().BalanceUpDay : new DateTime();
        }
    }
}
