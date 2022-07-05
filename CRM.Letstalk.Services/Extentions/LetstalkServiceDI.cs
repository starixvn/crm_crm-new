namespace CRM.Letstalk.Services.Extentions
{
    using System.Collections.Generic;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Extensions;
    using CRM.Letstalk.Services.Models;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class LetstalkServiceDI
    {
        public static void ResolveLetstalkServiceDI(this IServiceCollection services, IConfiguration configuration)
        {
            var botConfigSection = configuration.GetSection("LetstalkBotConfigurations");
            services.Configure<List<BotConfig>>(options => botConfigSection.Bind(options));
            var botConfigs = botConfigSection.Get<List<BotConfig>>();
            services.AddSingleton(botConfigs);

            var monitorSettingsSection = configuration.GetSection("MonitorSettings");
            services.Configure<MonitorSettings>(options => monitorSettingsSection.Bind(options));
            var monitorSettings = monitorSettingsSection.Get<MonitorSettings>();
            services.AddSingleton(monitorSettings);

            services.RegisterLetstalkBotService(configuration, botConfigs);
        }
    }
}