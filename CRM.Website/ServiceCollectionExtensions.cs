namespace CRM.Website
{
    using CRM.Core.Models;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.HttpOverrides;
    
    using Microsoft.Extensions.DependencyInjection;
    using StackExchange.Redis;
    using System;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;
    using CRM.Services.Feedback;

    public static class ServiceCollectionExtensions
    {
        public static void AddCrmHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            var apiKey = configuration.GetSection("NapSettings:APIKey").Value;
            services.AddHttpClient("TicketRefClient")
                .AddHttpMessageHandler<CustomDelegatingHandler>();

            services.AddTransient(_ => new CustomDelegatingHandler(apiKey));
        }

        public static void AddCrmAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.LoginPath = configuration.GetSection("AuthSettings:SignInPath").Value;
                options.LogoutPath = configuration.GetSection("AuthSettings:SignOutPath").Value;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(int.Parse(configuration["AuthSettings:SessionTimeout"]));
                options.SlidingExpiration = true;
                options.Cookie = new CookieBuilder
                {
                    Name = "Fanex.CRM.Cookie",
                    SecurePolicy = CookieSecurePolicy.SameAsRequest
                };
                options.Events.OnSigningOut = context =>
                {
                    context.Response.Redirect(options.LoginPath);
                    return Task.CompletedTask;
                };
            });

            services.AddSession(options =>
            {
                options.Cookie.IsEssential = true;
                options.IdleTimeout = TimeSpan.FromMinutes(int.Parse(configuration.GetSection("AuthSettings:SessionTimeout").Value));
                options.Cookie.Name = "Fanex.CRM.Session2";
            });

            services.AddAntiforgery(options =>
            {
                options.SuppressXFrameOptionsHeader = true;
            });

            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = configuration.GetSection("Fanex.Caching.Redis:ConnectionString").Value;
                options.InstanceName = configuration.GetSection("Fanex.Caching.Redis:ApplicationName").Value + ":Session:2";
            });

            var redis = ConnectionMultiplexer.Connect(configuration.GetSection("Fanex.Caching.Redis:ConnectionString").Value);
            var aplicationName = configuration.GetSection("Fanex.Caching.Redis:ApplicationName").Value;
            services.AddDataProtection()
                .SetApplicationName(aplicationName)
                .PersistKeysToStackExchangeRedis(redis, $"CRM.Website:DataProtection:Keys");
        }

        public static void ConfigureCrmOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AppSettings>(options => configuration.GetSection("AppSettings").Bind(options));

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
        }
    }
}