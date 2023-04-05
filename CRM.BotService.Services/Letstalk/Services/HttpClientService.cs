namespace CRM.BotService.Services.Letstalk.Services
{
    using System.Net.Http.Headers;
    using System.Text;
    using CRM.BotService.Services.Letstalk.Services.Interfaces;
    using Newtonsoft.Json;

    public class HttpClientService : IHttpClientService
    {
        private readonly IHttpClientFactory clientFactory;

        public HttpClientService(IHttpClientFactory clientFactory)
        {
            this.clientFactory = clientFactory;
        }

        public Task<T> ExecuteGetAsync<T>(string endPoint, string contentType, string inputParams = null, string token = "") where T : new()
            => SendHttpClientAsync<T>(endPoint, HttpMethod.Get, inputParams, token, contentType);

        public Task<T> ExecutePostAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new()
            => SendHttpClientAsync<T>(endPoint, HttpMethod.Post, inputParams, token, contentType);

        public Task<T> ExecutePutAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new()
            => SendHttpClientAsync<T>(endPoint, HttpMethod.Put, inputParams, token, contentType);

        public Task<T> ExecuteDeleteAsync<T>(string endPoint, string contentType, string inputParams, string token = "") where T : new()
            => SendHttpClientAsync<T>(endPoint, HttpMethod.Delete, inputParams, token, contentType);

        private async Task<T> SendHttpClientAsync<T>(string endPoint, HttpMethod method, string inputParams, string token, string contentType)
            where T : new()
        {
            ValidateEndPoint(endPoint);

            using (var request = CreateRequest(endPoint, method, token))
            {
                if (inputParams != null)
                {
                    request.Content = new StringContent(inputParams, Encoding.UTF8, contentType);
                }
                var client = clientFactory.CreateClient("default_http_client_with_proxy");
                using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead, CancellationToken.None))
                {
                    response.EnsureSuccessStatusCode();
                    var responseData = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<T>(responseData);

                    return result;
                }
            }
        }

        private static HttpRequestMessage CreateRequest(string endPoint, HttpMethod method, string token)
        {
            Uri url = new(endPoint);

            var request = new HttpRequestMessage(method, url);
            request.Headers.Accept.Clear();
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            return request;
        }

        private static void ValidateEndPoint(string endPoint)
        {
            if (string.IsNullOrWhiteSpace(endPoint))
            {
                throw new ArgumentNullException(nameof(endPoint));
            }
        }
    }
}