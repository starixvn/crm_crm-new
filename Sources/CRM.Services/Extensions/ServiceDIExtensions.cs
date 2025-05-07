namespace CRM.Services.Extensions;

using CRM.Services.ActionLog;
using CRM.Services.AdminTool;
using CRM.Services.BotServices;
using CRM.Services.BotServices.Interfaces;
using CRM.Services.Communication;
using CRM.Services.Customer;
using CRM.Services.Dashboard;
using CRM.Services.Feedback;
using CRM.Services.HeadlineNotification;
using CRM.Services.InformHeadline;
using CRM.Services.Interfaces;
using CRM.Services.NotificationCenter;
using CRM.Services.Redemption;
using CRM.Services.Remark;
using CRM.Services.Report;
using CRM.Services.Report.CategoriesSummaryReport;
using ExportExcel;
using Microsoft.Extensions.DependencyInjection;
using PicAndHeadline;

public static class ServiceDIExtensions
{
    public static void AddCrmServices(this IServiceCollection services)
    {
        services.AddScoped<ISettingService, SettingService>();
        services.AddScoped<INotificationListService, NotificationListService>();
        services.AddScoped<INotificationTemplateService, NotificationTemplateService>();
        services.AddScoped<INotificationTypeService, NotificationTypeService>();
        services.AddScoped<ICommonService, CommonService>();
        services.AddScoped<IChatTypeMappingService, ChatTypeMappingService>();
        services.AddScoped<IAnnouncementService, AnnouncementService>();
        services.AddScoped<ISendAnnouncementService, SendAnnouncementService>();
        services.AddScoped<ICommunicationToolSettingService, CommunicationToolSettingService>();
        services.AddScoped<IPicAssignmentService, PicAssignmentService>();
        services.AddScoped<ISettlementReportService, SettlementReportService>();
        services.AddScoped<IFeedbackSubjectService, FeedbackSubjectService>();
        services.AddScoped<IPicManagementService, PicManagementService>();
        services.AddScoped<IExportExcelService, ExportExcelService>();
        services.AddScoped<IFeedbackService, FeedbackService>();
        services.AddScoped<ITicketRefService, TicketRefService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IInformHeadlineService, InformHeadlineService>();
        services.AddScoped<ICommunicationService, CommunicationService>();
        services.AddScoped<IRemarkService, RemarkService>();
        services.AddScoped<IRedemptionService, RedemptionService>();
        services.AddScoped<IActionLogService, ActionLogService>();
        services.AddScoped<IDashboardService, DashboardService>();
        services.AddScoped<ILogStatisticsService, LogStatisticsService>();
        services.AddScoped<ISummaryReportService, SummaryReportService>();
        services.AddScoped<IIssueStatisticsService, IssueStatisticsService>();
        services.AddScoped<IDynamicReportService, DynamicReportService>();
        services.AddScoped<ICustomerReportService, CustomerReportService>();
        services.AddScoped<IHomeService, HomeService>();
        services.AddScoped<ILetstalkApiService, LetstalkApiService>();
        services.AddScoped<ITelegramApiService, TelegramApiService>();
        services.AddScoped<ISendAnnouncementService, SendAnnouncementService>();
        services.AddSingleton<IPermissionService, PermissionService>();
        services.AddScoped<ICategoryClassificationService, CategoryClassificationService>();
        services.AddScoped<INotificationCenterService, NotificationCenterService>();
        services.AddScoped<IManageSmaFeedbackService, ManageSmaFeedbackService>();
    }
}