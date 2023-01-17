using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CRM.Core.Middlewares
{
    public class CacheControlMiddleware
    {
        private readonly RequestDelegate _next;

        public CacheControlMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Response.GetTypedHeaders().CacheControl =
                new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
                {
                    Public = true,
                    MaxAge = TimeSpan.FromMinutes(1)
                };
            context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Expires] =
                DateTime.UtcNow.AddMinutes(1).ToString("R", CultureInfo.InvariantCulture);
            await _next(context);
        }
    }
}
