namespace CRM.BackgroundJob
{
    using System;
    using System.Collections.Generic;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Models.HealthCheck;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.Workers;
    using CRM.Core.Extensions;
    using CRM.Core.Middlewares;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.BotService.Client.AspNetCore;
    using Fanex.BotService.Client.Core.Services;
    using Fanex.BotService.Client.Core.Services.Interfaces;
    using Fanex.Caching;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Fanex.Data;
    using Fanex.Logging;
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
            LogManager
               .SetDefaultLogCategory(Configuration.GetSection("Fanex.Logging:LogCategory").Value)
               .Use(new List<ILogEngine>
               {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(Configuration.GetSection("Fanex.Logging:SentryEngineOptions:Dsn").Value)
                    })
               });

            services.AddFanexData(Configuration);

            RefDataTypeContainer
            .ConnectTo(new Uri(Configuration.GetSection("RemotingRefService:Fanex.RemotingRef.Service.Url").Value))
            .FromApplication("CRM.BackgroundJob");

            services.AddSingleton(Configuration);
            services.AddControllers();
            services.ResolveCoreConfiguration(Configuration);
            services.RegisterBotClient(Configuration);

            var redisConfig = Configuration.GetSection("RedisConfig").Get<RedisConfig>();
            ConfigDataProtection(services, redisConfig);
            ConfigRedisCache(services, redisConfig);
            services.ResolveCoreDI();
            AddConfiguration(services, Configuration);
            AddDependencyInjection(services, Configuration);
            AddWorker(services);
            ConfigBotService(services, Configuration);
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

        private static void AddConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AppJobSettings>(options => configuration.GetSection("AppSettings").Bind(options));
            services.Configure<List<JobSetting>>(configuration.GetSection("JobSettings"));

            var healthCheckSettings = configuration.GetSection("LetstalkHealthCheckSettings").Get<LetstalkHealthCheckSettings>();
            services.AddSingleton(healthCheckSettings);
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

            #region BotService
            services.AddSingleton<IBotService, BotService>();
            #endregion BotService

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IRemotingRefService, RemotingRefService>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<IJobRunningChecker, JobRunningChecker>();
            services.AddSingleton<ICommonFeedback, CommonFeedback>();
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
            services.AddSingleton<IBotHealthCheckService, BotHealthCheckService>();
            services.AddSingleton<IFeedbackTransactionService, FeedbackTransactionService>();
            services.AddSingleton<ICommonFeedback, CommonFeedback>();
            services.AddSingleton<ITOControlFeedbackService, TOControlFeedbackService>();
            services.AddSingleton<IChatBotCTOService, ChatBotCTOService>();
            services.AddSingleton<IChatBotArchivingDAService, ChatBotArchivingDAService>();
            services.AddSingleton<IProblemsAccountFeedbackService, ProblemsAccountFeedbackService>();
            services.AddSingleton<IAmendmentNotiFbService, AmendmentNotiFbService>();
            services.AddSingleton<IChatBotProblemAccountService, ChatBotProblemAccountService>();
            services.AddSingleton<IChatBotResultAmendmentService, ChatBotResultAmendmentService>();
            services.AddSingleton<ISynchronizeLicenseeService, SynchronizeLicenseeService>();
            services.AddSingleton<IVoidingSettledTicketsFeedbackService, VoidingSettledTicketsFeedbackService>();
            services.AddSingleton<IVoidingSettledTicketsService, VoidingSettledTicketsService>();
            services.AddSingleton<IArchivingDAService, ArchivingDAService>();
            services.AddSingleton<ISendAnnouncementService, SendAnnouncementService>();
            services.AddSingleton<IRefundSettledTicketService, RefundSettledTicketService>();
            services.AddSingleton<IVoidingBetIDService, VoidingBetIDService>();
            services.AddSingleton<IAbnormalBetService, AbnormalBetService>();
            services.AddSingleton<IMessageNotificationCenterService, MessageNotificationCenterService>();
            services.AddSingleton<ICaptureSettlementDataService, CaptureSettlementDataService>();
            services.AddSingleton<IGenerateResultAmendmentService, GenerateResultAmendmentService>();
            services.AddSingleton<IPushNotificationResultAmendmentService, PushNotificationResultAmendmentService>();
            services.AddSingleton<IGenerateLapNotificationService, GenerateLapNotificationService>();
            services.AddSingleton<ISendNotificationCenterService, SendNotificationCenterService>();
            services.AddSingleton<IAutoFbMessageNotificationCenterService, AutoFbMessageNotificationCenterService>();
        }

        private static void AddWorker(IServiceCollection services)
        {
            services.AddHostedService<AutoFbAmendmentNotiFbWoker>();
            services.AddHostedService<AutoFbProblemAccountWoker>();
            services.AddHostedService<AutoFbVoidingAbnormalBetWorker>();
            services.AddHostedService<AutoFbWinLossLimitWorker>();
            services.AddHostedService<AutoFbTurnoverControlWorker>();
            services.AddHostedService<AutoFbVoidingBetIDWorker>();
            services.AddHostedService<AutoFbAbnormalBetsWorker>();
            services.AddHostedService<AutoFbMessageNotificationCenterWoker>();

            services.AddHostedService<AutoChatbotWorker>();
            services.AddHostedService<AutoChatbotCWLWoker>();
            services.AddHostedService<AutoChatbotCTOWoker>();
            services.AddHostedService<AutoChatbotProblemAccountWorker>();
            services.AddHostedService<AutoChatbotResultAmendmentWoker>();
            services.AddHostedService<ScanAndSendLetstalkNotificationWorker>();
            services.AddHostedService<ScanAndSendAnnouncementWorker>();
            services.AddHostedService<SynchronizeNewLicenseeWorker>();
            services.AddHostedService<AutoFbVoidingSettledTicketsWorker>();
            services.AddHostedService<AutoFbArchivingDAWoker>();
            services.AddHostedService<AutoChatbotArchivingDAWoker>();
            services.AddHostedService<LetstalkHealthCheckWorker>();
            services.AddHostedService<AutoFbRefundSettledTicketWoker>();

            services.AddHostedService<MncCaptureSettlementDataWorker>();
            services.AddHostedService<MncGenerateResultAmendmentWorker>();
            services.AddHostedService<MncPushNotificationResultAmendmentWorker>();
            services.AddHostedService<MncGenerateLapNotificationWorker>();
            services.AddHostedService<MncSendNotificationCenterWorker>();
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
                DefaultDatabase = redisConfig.DefaultDatabase,
                ConnectRetry = redisConfig.ConnectRetry
            };
            var redis = ConnectionMultiplexer.Connect(configRedix);
            services.AddDataProtection()
                .PersistKeysToStackExchangeRedis(redis, redisConfig.ApplicationName + ":DataProtection:Keys")
                .SetApplicationName(redisConfig.ApplicationName);
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

        private static void ConfigBotService(IServiceCollection services, IConfiguration configuration)
        {
            var botConfigs = configuration.GetSection("Fanex.BotService").Get<BotServiceSetting>();
            services.AddSingleton(botConfigs);
        }
    }
}