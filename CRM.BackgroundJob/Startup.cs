namespace CRM.BackgroundJob
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.Workers;
    using CRM.Core.Extensions;
    using CRM.Core.Middlewares;
    using CRM.Core.Models;
    using CRM.Letstalk.Services.Extentions;
    using CRM.Letstalk.Services.Services;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Fanex.Caching;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Repositories;
    using Fanex.CRM.BackgroundJob.Services;
    using Fanex.Data;
    using Fanex.Data.SqlServer;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.AspNetCore;
    using Fanex.Logging.Extensions.Database;
    using Fanex.Logging.Sentry;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using ONEbook.UM.AspNetCore;
    using ONEbook.UM.Configurations;
    using ONEbook.UM.Helpers;
    using ONEbook.UM.Services;
    using ONEbook.UM.Transport;
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

            LogManager
                .SetDefaultLogCategory(Configuration.GetSection("Fanex.Logging:LogCategory").Value)
                .Use(new List<ILogEngine>
                {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(Configuration.GetSection("Fanex.Logging:SentryEngineOptions:Dsn").Value)
                    })
                });

            RefDataTypeContainer
            .ConnectTo(new Uri(Configuration.GetSection("RemotingRefService:Fanex.RemotingRef.Service.Url").Value))
            .FromApplication("CRM.BackgroundJob");

            ExceptionHandler
               .UseConfig(new LoggingConfiguration())
               .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);

            services.AddSingleton(Configuration);
            services.AddControllers();

            services.Configure<AppJobSettings>(options => Configuration.GetSection("AppSettings").Bind(options));
            services.Configure<List<JobSetting>>(Configuration.GetSection("JobSettings"));
            var redisConfig = Configuration.GetSection("RedisConfig").Get<RedisConfig>();
            ConfigDataProtection(services, redisConfig);
            ConfigRedisCache(services, redisConfig);
            services.ResolveCoreDI();
            services.ResolveLetstalkServiceDI(Configuration);
            AddDependencyInjection(services, Configuration);
            AddWorker(services);
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }


            app.UseMiddleware<ErrorHandler>();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Auth}/{action=Index}/{id?}");
            });
        }

        private static void AddDependencyInjection(IServiceCollection services, IConfiguration configuration)
        {
            #region ONEbookUM

            services.AddSingleton(new UMClientConfiguration().Initialize(configuration));
            services.AddSingleton<IHttpContextHelper, HttpContextHelper>();
            services.AddSingleton<IUMCacheService, UMCacheService>();
            services.AddSingleton<IUMRestClient, UMRestClient>();
            services.AddSingleton<IMaintenanceService, MaintenanceService>();

            #endregion ONEbookUM

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IRemotingRefService, RemotingRefService>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<IJobRunningChecker, JobRunningChecker>();
            services.AddSingleton<ICommonFeedback, CommonFeedback>();
            services.AddSingleton<ICustomerRepository, CustomerRepository>();
            services.AddSingleton<ISettingService, SettingService>();
            services.AddSingleton<ISystemSettingService, SystemSettingService>();
            services.AddSingleton<IMessageService, MessageService>();
            services.AddSingleton<ICustomerService, CustomerService>();
            services.AddSingleton<IFeedbackService, FeedbackService>();
            services.AddSingleton<IWinLossFeedbackService, WinLossFeedbackService>();
            services.AddSingleton<IFeedbackTicketVoidingService, FeedbackTicketVoidingService>();
            services.AddSingleton<IAutoFeedbackService, AutoFeedbackService>();
            services.AddSingleton<IChatBotTicketVoidingService, ChatBotTicketVoidingService>();
            services.AddSingleton<IChatBotCWLService, ChatBotCWLService>();
            services.AddSingleton<IChatBotJobService, ChatBotJobService>();
            services.AddSingleton<ISendNotificationService, SendNotificationService>();
            services.AddSingleton<IMonitorService, MonitorService>();
            services.AddSingleton<IFeedbackTransactionService, FeedbackTransactionService>();
            services.AddSingleton<ICommonFeedback, CommonFeedback>();
            services.AddSingleton<ITOControlFeedbackService, TOControlFeedbackService>();
            services.AddSingleton<IChatBotCTOService, ChatBotCTOService>();
            services.AddSingleton<IChatBotArchivingDAService, ChatBotArchivingDAService>();
            services.AddSingleton<IProblemsAccountFeedbackService, ProblemsAccountFeedbackService>();
            services.AddSingleton<IResultAmendmentService, ResultAmendmentService>();
            services.AddSingleton<IChatBotProblemAccountService, ChatBotProblemAccountService>();
            services.AddSingleton<IChatBotResultAmendmentService, ChatBotResultAmendmentService>();
            services.AddSingleton<ISynchronizeLicenseeService, SynchronizeLicenseeService>();
            services.AddSingleton<IVoidingSettledTicketsFeedbackService, VoidingSettledTicketsFeedbackService>();
            services.AddSingleton<IVoidingSettledTicketsService, VoidingSettledTicketsService>();
        }

        private static void AddWorker(IServiceCollection services)
        {
            services.AddHostedService<AutoFbResultAmendmentWoker>();
            services.AddHostedService<AutoFbProblemAccountWoker>();
            services.AddHostedService<AutoFbVoidingAbnormalBetWorker>();
            services.AddHostedService<AutoFbWinLossLimitWorker>();
            services.AddHostedService<AutoFbTurnoverControlWorker>();

            services.AddHostedService<AutoChatbotWorker>();
            services.AddHostedService<AutoChatbotCWLWoker>();
            services.AddHostedService<AutoChatbotCTOWoker>();
            services.AddHostedService<AutoChatbotProblemAccountWorker>();
            services.AddHostedService<AutoChatbotResultAmendmentWoker>();
            services.AddHostedService<ScanAndSendLetstalkNotificationWorker>();
            services.AddHostedService<SynchronizeNewLicenseeWorker>();
            services.AddHostedService<AutoFbVoidingSettledTicketsWorker>();

            services.AddHostedService<MonitorLetstalkWorker>();
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