using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Letstalk.Client.Configurations;
using CRM.Letstalk.Client.Services;
using CRM.Letstalk.Client.Services.Interfaces;
using CRM.Repositories;
using CRM.Services.Feedback;
using CRM.Services.Customer;
using Microsoft.Extensions.DependencyInjection;
using CRM.Services.InformHeadline;
using CRM.Services.Communication;
using CRM.Services.Remark;
using CRM.Services.Redemption;
using CRM.Services.ActionLog;
using CRM.Services.Dashboard;
using CRM.Services.Report;
using CRM.Services.Report.CategoriesSummaryReport;

namespace CRM.Services.Extensions
{
    public static class ServiceDIExtensions
    {
        public static void ResolveServiceDI(this IServiceCollection services)
        {
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
            services.AddTransient<IRemarkRepository, RemarkRepository>();

            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ISettingService, SettingService>();
            services.AddTransient<INotificationListService, NotificationListService>();
            services.AddTransient<INotificationTemplateService, NotificationTemplateService>();
            services.AddTransient<INotificationTypeService, NotificationTypeService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IChatTypeMappingService, ChatTypeMappingService>();
            services.AddTransient<ICommunicationToolSettingService, CommunicationToolSettingService>();
            services.AddTransient<IPicAssignmentService, PicAssignmentService>();
            services.AddTransient<ISettlementReportService, SettlementReportService>();
            services.AddTransient<IFeedbackSubjectService, FeedbackSubjectService>();
            services.AddTransient<IPicManagementService, PicManagementService>();
            services.AddScoped<IExportExcelService, ExportExcelService>();
            services.AddTransient<IFeedbackService, FeedbackService>();
            services.AddTransient<ITicketRefService, TicketRefService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddTransient<IInformHeadlineService, InformHeadlineService>();
            services.AddTransient<ICommunicationService, CommunicationService>();
            services.AddTransient<IRemarkService, RemarkService>();
            services.AddTransient<IRedemptionService, RedemptionService>();
            services.AddTransient<IActionLogService, ActionLogService>();
            services.AddTransient<IDashboardService, DashboardService>();
            services.AddTransient<ILogStatisticsService, LogStatisticsService>();
            services.AddTransient<ISummaryReportService, SummaryReportService>();
            services.AddTransient<IIssueStatisticsService, IssueStatisticsService>();
            services.AddTransient<IDynamicReportService, DynamicReportService>();
            services.AddTransient<ICustomerReportService, CustomerReportService>();
        }

        public static void ResolveLetstalkServiceDI(this IServiceCollection services, IList<BotConfig> botConfigs)
        {
            services.AddTransient<ICryptographyService, CryptographyService>();
            services.AddTransient<IJwtService, JwtService>();
            services.AddTransient<RestClientService>();
            services.AddTransient<LetstalkService>();
            services.AddTransient<Func<int, ILetstalkService>>(serviceProvider => botId =>
            {
                var botConfig = botConfigs.FirstOrDefault(config => config.BotAccountId == botId);

                if (botConfig == null)
                {
                    throw new ArgumentNullException("Bot not found", new Exception($"The bot ID: {botId} does not existed in configuration"));
                }

                var restClientService = new RestClientService(
                RestClientService.CreateDefaultClient(botConfig.ApiEndpoint, botConfig.ProxyAddress, botConfig.ByPassProxyLocal, botConfig.IsUseProxy),
                new JwtService(),
                botConfig);

                return new LetstalkService(serviceProvider.GetRequiredService<ICryptographyService>(), restClientService, botConfig);
            });
        }
    }
}