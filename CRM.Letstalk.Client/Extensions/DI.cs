namespace CRM.Letstalk.Client.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Constants;
    using CRM.Letstalk.Client.Services;
    using CRM.Letstalk.Client.Services.Interfaces;
    using Fanex.Caching;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DI
    {
        public static void RegisterLetstalkBotService(this IServiceCollection services, IConfiguration configuration, List<BotConfig> botConfigs)
        {
            RegisterHttpClientFactory(services, configuration);

            services.AddSingleton<ICryptographyService, CryptographyService>();
            services.AddSingleton<IJwtService, JwtService>();
            services.AddSingleton<HttpClientService>();
            services.AddSingleton<LetstalkService>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<Func<int, ILetstalkService>>(serviceProvider => botId =>
            {
                var botConfig = botConfigs.FirstOrDefault(config => config.BotAccountId == botId);

                if (botConfig == null)
                {
                    throw new ArgumentNullException($"The bot ID: {botId} does not existed in config file");
                }

                var httpClientService = new HttpClientService(serviceProvider.GetRequiredService<IHttpClientFactory>(), serviceProvider.GetService<IJwtService>(), botConfig);

                return new LetstalkService(
                    serviceProvider.GetRequiredService<ICryptographyService>(),
                    httpClientService,
                    serviceProvider.GetRequiredService<ICacheService>(),
                    botConfig);
            });
        }

        private static void RegisterHttpClientFactory(IServiceCollection services, IConfiguration configuration)
        {
            var isUseProxy = bool.Parse(configuration.GetSection("HttpClientSetting:IsUseProxy").Value);
            var proxyAddress = configuration.GetSection("HttpClientSetting:ProxyAddress").Value;
            var bypassOnLocal = bool.Parse(configuration.GetSection("HttpClientSetting:BypassOnLocal").Value);

            services.AddHttpClient(HttpClientName.DefaultHttpClientWithProxy).ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
            {
                UseProxy = isUseProxy,
                Proxy = new WebProxy(proxyAddress, bypassOnLocal)
            });

            ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, errors) =>
            {
                return true;
            };
        }
    }
}