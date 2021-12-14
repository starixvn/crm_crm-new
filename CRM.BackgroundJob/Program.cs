namespace Fanex.CRM.BackgroundJob
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
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
    using global::CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Services;
    using global::CRM.BackgroundJob.Workers;
    using global::CRM.Core.Extensions;
    using global::CRM.Letstalk.Services.Extentions;
    using global::CRM.Letstalk.Services.Services;
    using global::CRM.Letstalk.Services.Services.Interfaces;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Hosting.Internal;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using ONEbook.UM.AspNetCore;
    using ONEbook.UM.Configurations;
    using ONEbook.UM.Helpers;
    using ONEbook.UM.Services;
    using ONEbook.UM.Transport;
    using Sentry;
    using Serilog;
    using StackExchange.Redis;

    public static class Program
    {
        public static void Main(string[] args)
        {

            var isService = !(Debugger.IsAttached || args.Contains("--console"));
            if (isService)
            {
                var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
                var pathToContentRoot = Path.GetDirectoryName(pathToExe);
                Directory.SetCurrentDirectory(pathToContentRoot);
            }

            var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .Build();


            Host.CreateDefaultBuilder(args)
               .UseWindowsService()
               .ConfigureAppConfiguration(builder => builder.AddConfiguration(configuration))
               .ConfigureServices((hostContext, services) =>
               {
                   AddConfiguration(services, configuration);
                   AddDependencyInjection(services, configuration);
                   AddWorker(services);
               })
               .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration))
               .Build().Run();
        }

            private static void AddConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            var connections = configuration.GetSection("ConnectionStrings")
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
                .SetDefaultLogCategory(configuration.GetSection("Fanex.Logging:LogCategory").Value)
                .Use(new List<ILogEngine>
                {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(configuration.GetSection("Fanex.Logging:SentryEngineOptions:Dsn").Value)
                    })
                });

            RefDataTypeContainer
            .ConnectTo(new Uri(configuration.GetSection("RemotingRefService:Fanex.RemotingRef.Service.Url").Value))
            .FromApplication("CRM.BackgroundJob");

            services.Configure<IConfiguration>(configuration);
            services.AddSingleton<IRemotingRefService, RemotingRefService>();

            ExceptionHandler
                .UseConfig(new LoggingConfiguration())
                .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);


            services.AddLogging((builder) =>
            {
                builder.AddSerilog(dispose: true);
            });


            services.Configure<AppJobSettings>(options => configuration.GetSection("AppSettings").Bind(options));
            services.Configure<List<JobSetting>>(configuration.GetSection("JobSettings"));

            services.ResolveCoreDI();
            services.ResolveLetstalkServiceDI(configuration);
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
            services.AddTransient<ICacheService, CacheService>();
            services.AddTransient<IJobRunningChecker, JobRunningChecker>();
            services.AddScoped<ICommonFeedback, CommonFeedback>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ISettingService, SettingService>();
            services.AddScoped<ISystemSettingService, SystemSettingService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IFeedbackService, FeedbackService>();
            services.AddScoped<IWinLossFeedbackService, WinLossFeedbackService>();
            services.AddScoped<IFeedbackTicketVoidingService, FeedbackTicketVoidingService>();
            services.AddScoped<IAutoFeedbackService, AutoFeedbackService>();
            services.AddScoped<IChatBotTicketVoidingService, ChatBotTicketVoidingService>();
            services.AddScoped<IChatBotCWLService, ChatBotCWLService>();
            services.AddScoped<IChatBotJobService, ChatBotJobService>();
            services.AddScoped<ISendNotificationService, SendNotificationService>();
            services.AddScoped<IMonitorService, MonitorService>();
            services.AddScoped<IFeedbackTransactionService, FeedbackTransactionService>();
            services.AddScoped<ICommonFeedback, CommonFeedback>();
            services.AddScoped<ITOControlFeedbackService, TOControlFeedbackService>();
            services.AddScoped<IChatBotCTOService, ChatBotCTOService>();
            services.AddScoped<IProblemsAccountFeedbackService, ProblemsAccountFeedbackService>();
            services.AddScoped<IResultAmendmentService, ResultAmendmentService>();
            services.AddScoped<IChatBotProblemAccountService, ChatBotProblemAccountService>();
            services.AddScoped<IChatBotResultAmendmentService, ChatBotResultAmendmentService>();
            services.AddScoped<ISynchronizeLicenseeService, SynchronizeLicenseeService>();
            services.AddScoped<IVoidingSettledTicketsFeedbackService, VoidingSettledTicketsFeedbackService>();
            services.AddScoped<IVoidingSettledTicketsService, VoidingSettledTicketsService>();
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
    }
}