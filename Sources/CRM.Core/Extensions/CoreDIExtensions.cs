namespace CRM.Core.Extensions
{
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Fanex.Caching;
    using Fanex.Data.Repository;
    using Fanex.Logging;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class CoreDIExtensions
    {
        public static void AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            var botConfigs = configuration.GetSection("BotServiceSettings").Get<BotServiceSettings>();
            services.AddSingleton(botConfigs);

            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.AddSingleton<IBaseService, BaseService>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<IMemoryCache, MemoryCache>();
            services.AddSingleton<ILogger, Logger>();
            services.AddSingleton<ICRMLogService, CRMLogService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddSingleton<BotServiceHttpClientBase>();
            services.AddSingleton<IChatBotSendMessageService, ChatBotSendMessageService>();
            services.AddHttpClient();
        }
    }
}