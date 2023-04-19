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
    using Fanex.Caching;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DIResolver
    {
        public static void ResolveWebhookServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IWebhookReceiver, WebhookReceiver>();

            services.AddTransient<JoinGroupEventHandler>();
            services.AddTransient<KickOutBotEventHandler>();
            services.AddTransient<ChangeGroupNameEventHandler>();
            services.AddTransient<AddContactEventHandler>();
            services.AddTransient<ReceiveMessageEventHandler>();
            services.AddTransient<Func<string, IEventHandler>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case EventType.JoinGroup:
                        return serviceProvider.GetRequiredService<JoinGroupEventHandler>();

                    case EventType.KickOutGroup:
                        return serviceProvider.GetRequiredService<KickOutBotEventHandler>();

                    case EventType.ChangeGroupName:
                        return serviceProvider.GetRequiredService<ChangeGroupNameEventHandler>();

                    case EventType.Message:
                        return serviceProvider.GetRequiredService<ReceiveMessageEventHandler>();

                    case EventType.DeleteContact:
                    case EventType.AddContact:
                        return serviceProvider.GetRequiredService<AddContactEventHandler>();

                    default:
                        throw new KeyNotFoundException($"The event type {key} have not implements!");
                }
            });

            RegisterTelegramBots(services, configuration);
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
            var isUseProxy = bool.Parse(configuration.GetSection("HttpClientSetting:IsUseProxy").Value);
            var proxyAddress = configuration.GetSection("HttpClientSetting:ProxyAddress").Value;
            var bypassOnLocal = bool.Parse(configuration.GetSection("HttpClientSetting:BypassOnLocal").Value);

            services.AddHttpClient(NamedHttpClients.ProxiedClient).ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
            {
                UseProxy = isUseProxy,
                Proxy = new WebProxy(proxyAddress, bypassOnLocal)
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

        private static void RegisterTelegramBots(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<List<WebhookConfiguration>>(options => configuration.GetSection("WebhookConfigurations").Bind(options));
            services.Configure<List<TelegramBotConfigurations>>(options => configuration.GetSection("TelegramBotConfigurations").Bind(options));

            services.AddTransient<ITelegramBotService, TelegramBotService>();
        }
    }
}