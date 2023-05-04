namespace CRM.BotService.Endpoint
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using CRM.BotService.Core.Extensions;
    using CRM.BotService.Core.Models;
    using CRM.Core.Extensions;
    using CRM.Core.Middlewares;
    using CRM.Core.Models;
    using Fanex.Data;
    using Fanex.Data.SqlServer;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.AspNetCore;
    using Fanex.Logging.Extensions.Database;
    using Fanex.Logging.Sentry;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.IdentityModel.Tokens;
    using Sentry;
    using StackExchange.Redis;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            LogManager
            .SetDefaultLogCategory(Configuration.GetSection("LogCategory").Value)
            .Use(new List<ILogEngine>
            {
                new SentryLogging(new SentryEngineOptions
                {
                    Dsn = new Dsn(Configuration.GetSection("SentryEngineOptions:Dsn").Value),
                })
            });

            var connections = Configuration.GetSection("ConnectionStrings")
                     .GetChildren()
                     .AsEnumerable()
                     .Where(x => !string.IsNullOrWhiteSpace(x.GetValue<string>("Name")))
                     .ToDictionary(x => x.GetValue<string>("Name"),
                         y => new ConnectionConfiguration(y.GetValue<string>("Name"), y.GetValue<string>("ConnectionString"), y.GetValue<string>("ProviderName")));

            DbSettingProviderManager
               .StartNewSession()
               .Use(connections)
               .WithSqlServer()
               .UseDefaultDbSettingProvider("~/App_Data/SpNames.xml")
               .Run();

            ExceptionHandler
                .UseConfig(new LoggingConfiguration())
                .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);

            var redisConfig = Configuration.GetSection("RedisConfig").Get<RedisConfig>();
            ConfigDataProtection(services, redisConfig);
            ConfigRedisCache(services, redisConfig);

            var appSettingsSection = Configuration.GetSection("WebSettings");
            services.Configure<WebSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<WebSettings>();
            services.AddSingleton(appSettings);

            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddControllers().AddNewtonsoftJson();
            services.ResolveCoreDI();
            services.ResolveWebhookServices(Configuration);
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseMiddleware<ErrorHandler>();
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Auth}/{action=Index}/{id?}");
            });
        }

        private static void ConfigDataProtection(IServiceCollection services, RedisConfig redisConfig)
        {
            var configRedix = new ConfigurationOptions
            {
                EndPoints =
                {
                    { redisConfig.Server, redisConfig.Port }
                },
                Password = redisConfig.Password,
                DefaultDatabase = redisConfig.DefaultDatabase
            };
            var redis = ConnectionMultiplexer.Connect(configRedix);
            services.AddDataProtection()
                .PersistKeysToStackExchangeRedis(redis, redisConfig.Password)
                .SetApplicationName(redisConfig.ApplicationName + ":DataProtection:Keys");
        }

        private static void ConfigRedisCache(IServiceCollection services, RedisConfig redisConfig)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.ConfigurationOptions = new ConfigurationOptions
                {
                    EndPoints =
                    {
                        { redisConfig.Server, redisConfig.Port }
                    },
                    Password = redisConfig.Password,
                    DefaultDatabase = redisConfig.DefaultDatabase
                };
                options.InstanceName = redisConfig.ApplicationName + ":Session:";
            });
        }
    }
}