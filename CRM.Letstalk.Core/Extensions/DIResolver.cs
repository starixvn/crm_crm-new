namespace CRM.Letstalk.Core.Extensions
{
    using System;
    using System.Collections.Generic;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Extensions;
    using CRM.Letstalk.Client.Services;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Core.Constants;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Services;
    using CRM.Letstalk.Core.Services.EventHandler;
    using CRM.Letstalk.Core.Services.Interfaces;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DIResolver
    {
        public static void ResolveWebhookServices(this IServiceCollection services, IConfiguration configuration)
        {
            var webhookConfigurationSection = configuration.GetSection("WebhookConfigurations");
            services.Configure<List<WebhookConfiguration>>(options => webhookConfigurationSection.Bind(options));
            var webhookConfigs = webhookConfigurationSection.Get<List<WebhookConfiguration>>();
            services.AddSingleton(webhookConfigs);

            services.AddTransient<IWebhookReceiver, WebhookReceiver>();
            services.AddTransient<ICryptographyService, CryptographyService>();
            services.AddTransient<IJwtService, JwtService>();

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
        }

        public static void ResolveLetstalkServices(this IServiceCollection services, IConfiguration configuration)
        {
            var botConfigSections = configuration.GetSection("LetstalkBotConfigurations");
            services.Configure<List<BotConfig>>(options => botConfigSections.Bind(options));
            var botConfigs = botConfigSections.Get<List<BotConfig>>();
            services.AddSingleton(botConfigs);
            services.RegisterLetstalkBotService(configuration, botConfigs);
        }
    }
}