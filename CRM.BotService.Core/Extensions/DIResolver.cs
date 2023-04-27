namespace CRM.BotService.Core.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services;
    using CRM.BotService.Core.Services.EventHandler;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;
    using Fanex.Caching;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DIResolver
    {
        public static void ResolveWebhookServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ILetstalkEventHandler, LetstalkEventHandler>();
            RegisterBotTelegramService(services, configuration);
        }

        public static void ResolveLetstalkServices(this IServiceCollection services, IConfiguration configuration)
        {
            var botConfigs = configuration.GetSection("LetstalkBotConfigurations").Get<List<LetstalkBotConfig>>();
            services.AddSingleton(botConfigs);

            var channels = configuration.GetSection("Channels").Get<List<BotChannelInfo>>();
            services.AddSingleton(channels);

            services.AddSingleton<IPushMessageService, PushMessageService>();
            RegisterBotLetstalkService(services, configuration, botConfigs);
        }

        private static void RegisterBotLetstalkService(IServiceCollection services, IConfiguration configuration, List<LetstalkBotConfig> botConfigs)
        {
            var httpClientSettings = configuration.GetSection("HttpClientSetting").Get<HttpClientSetting>();
            services.AddSingleton(httpClientSettings);

            services.AddHttpClient(NamedHttpClients.ProxiedClient).ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
            {
                UseProxy = httpClientSettings.IsUseProxy,
                Proxy = new WebProxy(httpClientSettings.ProxyAddress, httpClientSettings.BypassOnLocal)
            });

            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<Func<int, ILetstalkClientService>>(serviceProvider => botId =>
            {
                var botConfig = botConfigs.FirstOrDefault(config => config.BotAccountId == botId);

                if (botConfig == null)
                {
                    throw new ArgumentNullException($"The bot ID: {botId} does not existed in config file");
                }

                return new LetstalkClientService(
                    serviceProvider.GetRequiredService<IHttpClientFactory>(),
                    serviceProvider.GetRequiredService<ICacheService>(),
                    botConfig);
            });
        }

        private static void RegisterBotTelegramService(IServiceCollection services, IConfiguration configuration)
        {
            var telegramWebhook = configuration.GetSection("WebhookConfigurations").Get<List<WebhookConfiguration>>();
            services.AddSingleton(telegramWebhook);

            var telegramBots = configuration.GetSection("TelegramBotConfigurations").Get<List<TelegramBotConfigurations>>();
            services.AddSingleton(telegramBots);

            var httpClientSettings = configuration.GetSection("HttpClientSetting").Get<HttpClientSetting>();
            services.AddSingleton(httpClientSettings);

            services.AddHttpClient(NamedHttpClients.ProxiedClient).ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
            {
                UseProxy = httpClientSettings.IsUseProxy,
                Proxy = new WebProxy(httpClientSettings.ProxyAddress, httpClientSettings.BypassOnLocal)
            });

            services.AddSingleton<ICRMLogService, CRMLogService>();
            services.AddSingleton<Func<int, ITelegramBotService>>(serviceProvider => botId =>
            {
                var botConfig = telegramBots.FirstOrDefault(config => config.BotId == botId);

                if (botConfig == null)
                {
                    throw new ArgumentNullException($"The bot ID: {botId} does not existed in config file");
                }

                return new TelegramBotService(
                    serviceProvider.GetRequiredService<IHttpClientFactory>(),
                    telegramBots,
                    serviceProvider.GetRequiredService<ICRMLogService>());
            });
        }
    }
}