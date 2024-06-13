namespace CRM.Website
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.IO;
    using System.Threading.Tasks;
    using CRM.Core.Extensions;
    using CRM.Core.Middlewares;
    using CRM.Core.Models;
    using CRM.Services.Extensions;
    using Fanex.Data.SqlServer;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.AspNetCore;
    using Fanex.Logging.Extensions.Database;
    using Fanex.Logging.Sentry;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Client.Session;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.HttpOverrides;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Infrastructure;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Hosting;
    using ONEbook.UM.AspNetCore;
    using ONEbook.UM.AspNetCore.Filters;
    using ONEbook.UM.Configurations;
    using ONEbook.UM.Helpers;
    using ONEbook.UM.Services;
    using ONEbook.UM.Transport;
    using Sentry;
    using StackExchange.Redis;

    [ExcludeFromCodeCoverage]
    public class Startup
    {
        private readonly ConnectionMultiplexer Redis;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Redis = ConnectionMultiplexer.Connect(Configuration.GetSection("Fanex.Caching.Redis:ConnectionString").Value);
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddFanexSql(Configuration);

            LogManager
                .SetDefaultLogCategory(Configuration.GetSection("Sentry:LogCategory").Value)
                .Use(new List<ILogEngine>
                {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(Configuration.GetSection("Sentry:Dsn").Value),
                        FrontEndDsn = new Dsn(Configuration.GetSection("Sentry:FrontEndDsn").Value)
                    })
                });

            ExceptionHandler
                .UseConfig(new LoggingConfiguration())
                .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);

            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.LoginPath = Configuration.GetSection("AuthSettings:SignInPath").Value;
                options.LogoutPath = Configuration.GetSection("AuthSettings:SignOutPath").Value;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(int.Parse(Configuration["AuthSettings:SessionTimeout"]));
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
                options.IdleTimeout = TimeSpan.FromMinutes(int.Parse(Configuration.GetSection("AuthSettings:SessionTimeout").Value));
                options.Cookie.Name = "Fanex.CRM.Session2";
            });

            services.Configure<AppSettings>(options => Configuration.GetSection("AppSettings").Bind(options));

            services.ResolveCoreConfiguration(Configuration);

            services.AddAntiforgery(options =>
            {
                options.SuppressXFrameOptionsHeader = true;
            });

            ConfigDataProtection(services);

            services.AddControllersWithViews(
                mvcOption => mvcOption.Filters.Add(new AutoValidateAntiforgeryTokenAttribute())
            ).AddNewtonsoftJson();

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });

            RegisterDI(services);
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseForwardedHeaders();
            }
            else
            {
                app.UseMiddleware<ErrorHandler>();
                app.UseForwardedHeaders();
                app.UseHsts();
            }

            app.UseStaticFiles();
            var compositeProvider = new CompositeFileProvider(
                env.WebRootFileProvider,
                new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "www/dist")));
            env.WebRootFileProvider = compositeProvider;
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = compositeProvider,
                RequestPath = "/www/dist"
            });

            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod());
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCookiePolicy();
            app.UseSession();

            NapClientManager
              .UseConfig(app.ApplicationServices.GetService<INapSettings>())
              .UseSession(app.ApplicationServices.GetService<INapSession>());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapFallbackToController("Index", "Home");
            });
        }

        private void RegisterDI(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            services.AddSingleton(new UMClientConfiguration().Initialize(Configuration));
            services.AddSingleton<IHttpContextHelper, HttpContextHelper>();
            services.AddSingleton<CheckUMFilterAttribute>();
            services.AddSingleton<IUMCacheService, UMCacheService>();
            services.AddSingleton<IUMRestClient, UMRestClient>();
            services.AddSingleton<IMaintenanceService, MaintenanceService>();

            services.AddSingleton<INapSettings>(new NapSettings(Configuration));
            services.AddSingleton<INapSession, NapSession>();

            services.AddSingleton<IGroupService, GroupService>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<ISecurityService, SecurityService>();
            services.AddSingleton<ISiteService, SiteService>();
            services.AddSingleton<IMemoryCache, MemoryCache>();

            services.AddSingleton<ILogger, Logger>();
            services.ResolveCoreDI();
            services.ResolveServiceDI();
        }

        private void ConfigDataProtection(IServiceCollection services)
        {
            string aplicationName = Configuration.GetSection("Fanex.Caching.Redis:ApplicationName").Value;
            services.AddDataProtection()
                .SetApplicationName(aplicationName)
                .PersistKeysToStackExchangeRedis(Redis, $"CRM.Website:DataProtection:Keys");
        }
    }
}