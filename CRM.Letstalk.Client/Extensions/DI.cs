namespace CRM.Letstalk.Client.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services;
    using CRM.Letstalk.Client.Services.Interfaces;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DI
    {
        public static void RegisterLetstalkBotService(this IServiceCollection services, IConfiguration configuration, List<BotConfig> botConfigs)
        {
            services.AddHttpClient();

            services.AddSingleton<ICryptographyService, CryptographyService>();
            services.AddSingleton<IJwtService, JwtService>();
            services.AddTransient<HttpClientService>();
            services.AddTransient<LetstalkService>();
            services.AddTransient<Func<int, ILetstalkService>>(serviceProvider => botId =>
            {
                var botConfig = botConfigs.FirstOrDefault(config => config.BotAccountId == botId);

                if (botConfig == null)
                {
                    throw new ArgumentNullException($"The bot ID: {botId} does not existed in config file");
                }

                var httpClientService = new HttpClientService(serviceProvider.GetRequiredService<IHttpClientFactory>(), serviceProvider.GetService<IJwtService>(), botConfig);

                return new LetstalkService(serviceProvider.GetRequiredService<ICryptographyService>(), httpClientService, botConfig);
            });
        }

        //private static HttpClient GetDefaultHttpClient(IConfiguration configuration)
        //{
        //    var isUseProxy = bool.Parse(configuration.GetSection("HttpClientSetting:IsUseProxy").Value);
        //    var proxyAddress = configuration.GetSection("HttpClientSetting:ProxyAddress").Value;
        //    var bypassOnLocal = bool.Parse(configuration.GetSection("HttpClientSetting:BypassOnLocal").Value);

        //    HttpClient httpClient;

        //    if (isUseProxy)
        //    {
        //        var proxy = new WebProxy(proxyAddress, bypassOnLocal);
        //        var socketsHttpHandler = new SocketsHttpHandler
        //        {
        //            UseProxy = isUseProxy,
        //            Proxy = proxy,
        //        };

        //        httpClient = new HttpClient(handler: socketsHttpHandler);
        //    }
        //    else
        //    {
        //        httpClient = new HttpClient();
        //    }

        //    return httpClient;
        //}
    }
}