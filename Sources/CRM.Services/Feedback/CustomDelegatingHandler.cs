namespace CRM.Services.Feedback;

using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public class CustomDelegatingHandler(string apiKey) : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var nonce = Guid.NewGuid().ToString("N");
        var signatureRawData = apiKey + ":" + nonce;
        using (var hmac = new HMACSHA256(Convert.FromBase64String(apiKey)))
        {
            var requestSignatureBase64String = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(signatureRawData)));
            request.Headers.Authorization = new AuthenticationHeaderValue("amx",
                $"{requestSignatureBase64String}:{nonce}");
        }

        var response = await base.SendAsync(request, cancellationToken);

        return response;
    }
}