namespace CRM.Letstalk.Client.Services
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Constants;
    using CRM.Letstalk.Client.Services.Interfaces;
    using Newtonsoft.Json;

    public class HttpClientService : IHttpClientService
    {
        private const int ExpiredTokenPeriodInMiliseconds = 5000;
        private readonly IHttpClientFactory clientFactory;
        private readonly IJwtService jwtService;
        private readonly BotConfig botConfig;

        public HttpClientService(IHttpClientFactory clientFactory, IJwtService jwtService, BotConfig botConfig)
        {
            this.clientFactory = clientFactory;
            this.jwtService = jwtService;
            this.botConfig = botConfig;
        }

        public Task<T> ExecuteGetAsync<T>(string endPoint, IDictionary<string, object> data = null) where T : new()
            => ExecuteAsync<T>(endPoint, HttpMethod.Get, data);

        public Task<T> ExecutePostAsync<T>(string endPoint, IDictionary<string, object> data) where T : new()
            => ExecuteAsync<T>(endPoint, HttpMethod.Post, data);

        public Task<T> ExecutePutAsync<T>(string endPoint, IDictionary<string, object> data) where T : new()
            => ExecuteAsync<T>(endPoint, HttpMethod.Put, data);

        public Task<T> ExecuteDeleteAsync<T>(string endPoint, IDictionary<string, object> data) where T : new()
            => ExecuteAsync<T>(endPoint, HttpMethod.Delete, data);

        private async Task<T> ExecuteAsync<T>(string endPoint, HttpMethod method, IDictionary<string, object> data)
            where T : new()
        {
            ValidateEndPoint(endPoint);

            var request = CreateRequest(endPoint, method);

            if (data != null)
            {
                var encodedData = Encode(data);
                var content = new StringContent(encodedData, Encoding.UTF8, "application/json");
                request.Content = content;
            }
            var client = clientFactory.CreateClient(HttpClientName.DefaultHttpClientWithProxy);
            var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead, CancellationToken.None);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<T>(responseData);

                return result;
            }

            return default;
        }

        private HttpRequestMessage CreateRequest(string endPoint, HttpMethod method)
        {
            Uri url = new Uri($"{botConfig.ApiEndpoint}{endPoint}");
            var request = new HttpRequestMessage(method, url);
            request.Headers.Accept.Clear();
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", EncodeBase64(botConfig.ApiKey));

            return request;
        }

        private static void ValidateEndPoint(string endPoint)
        {
            if (string.IsNullOrWhiteSpace(endPoint))
            {
                throw new ArgumentNullException(nameof(endPoint));
            }
        }

        private string Encode(IDictionary<string, object> data)
        {
            var totalMilisecondNow = DateTimeOffset.Now.ToUnixTimeMilliseconds();

            data.Add("iat", totalMilisecondNow);
            data.Add("exp", totalMilisecondNow + ExpiredTokenPeriodInMiliseconds);

            var result = jwtService.Encode(botConfig.SecureKey, data);
            return result;
        }

        private static string EncodeBase64(string input)
            => Convert.ToBase64String(Encoding.UTF8.GetBytes(input));
    }
}