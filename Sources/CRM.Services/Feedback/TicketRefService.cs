namespace CRM.Services.Feedback;

using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CRM.Criteria.Feedback;
using CRM.Models.Feedback;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

public interface ITicketRefService
{
    Task<TicketInfo> GetTicketByRefNoAsync(long refno);

    Task<DateTime> GetBalanceUpdayAsync();
}

public class TicketRefService(
    IBaseService baseService,
    IConfiguration configuration,
    IHttpClientFactory httpClientFactory)
    : ITicketRefService
{
    public async Task<TicketInfo> GetTicketByRefNoAsync(long refno)
    {
        try {
            var napUrl = configuration.GetSection("NapSettings:Url").Value;
            var client = httpClientFactory.CreateClient("TicketRefClient");

            var url = new Uri(napUrl + "BetListApi/GetBetListByRefNo?refno=" + refno);
            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            return jsonString != null ? JsonConvert.DeserializeObject<TicketInfo>(jsonString) : await Task.FromResult<TicketInfo>(null);
        }
        catch (HttpRequestException ex)
        {
            throw new HttpRequestException($"Error fetching ticket by refno {refno}: {ex.Message}", ex);
        }
    }

    public async Task<DateTime> GetBalanceUpdayAsync()
    {
        var criteria = new BalanceUpDayCriteria();
        var balance = await baseService.GetDataAsync<BalanceUpday>(criteria);
        return balance.Any() ? balance.First().BalanceUpDay : new DateTimeOffset().DateTime;
    }
}