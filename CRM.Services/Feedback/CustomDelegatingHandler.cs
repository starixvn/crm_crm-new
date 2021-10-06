namespace CRM.Services.Feedback
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class CustomDelegatingHandler : DelegatingHandler
    {
        private readonly string apiKey;
        public CustomDelegatingHandler(string apiKey)
        {
            this.apiKey = apiKey;
        }

        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            string nonce = Guid.NewGuid().ToString("N");
            string signatureRawData = apiKey + ":" + nonce;
            using (HMACSHA256 hmac = new HMACSHA256(Convert.FromBase64String(apiKey)))
            {
                string requestSignatureBase64String = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(signatureRawData)));
                request.Headers.Authorization = new AuthenticationHeaderValue("amx", string.Format("{0}:{1}", requestSignatureBase64String, nonce));
            }

            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

            return response;
        }
    }
}
