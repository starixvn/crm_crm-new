namespace CRM.BotService.Services.Letstalk.Services.Interfaces
{
    public interface IHttpClientService
    {
        Task<T> ExecuteGetAsync<T>(string endPoint, string contentType, string inputParams = null, string token = "") where T : new();

        Task<T> ExecutePostAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new();

        Task<T> ExecutePutAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new();

        Task<T> ExecuteDeleteAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new();
    }
}