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
    using Serilog;
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

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();

            ExceptionHandler
               .UseConfig(new LoggingConfiguration())
               .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);

            services.Configure<IConfiguration>(Configuration);
            services.AddControllers();

            services.Configure<AppJobSettings>(options => Configuration.GetSection("AppSettings").Bind(options));
            services.Configure<List<JobSetting>>(Configuration.GetSection("JobSettings"));

            services.ResolveCoreDI();
            services.ResolveLetstalkServiceDI(Configuration);
            AddDependencyInjection(services, Configuration);
            AddWorker(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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