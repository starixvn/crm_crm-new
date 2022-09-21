namespace CRM.Core.Extensions
{
    using CRM.Core.Repositories;
    using CRM.Core.Services;
    using Fanex.Caching;
    using Fanex.Data.Repository;
    using Fanex.Logging;
    using Microsoft.Extensions.DependencyInjection;

    public static class CoreDIExtensions
    {
        public static void ResolveCoreDI(this IServiceCollection services)
        {
            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.AddSingleton<IBaseRepository, BaseRepository>();
            services.AddSingleton<IBaseService, BaseService>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<ILogger, Logger>();
            services.AddSingleton<ICRMLogService, CRMLogService>();
            services.AddScoped<ISessionService, SessionService>();
        }
    }
}