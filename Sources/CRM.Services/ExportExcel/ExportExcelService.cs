namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.IO;
using System.Linq;
using CRM.Models.AdminTool.CategoryClassification;
using CRM.Models.ChatTypeMapping;
using CRM.Models.Feedback;
using CRM.Models.InformHeadline;
using CRM.Models.ManageSmaFeedback;
using CRM.Models.NotificationCenter;
using CRM.Models.PicAndHeadline;
using CRM.Models.Report;
using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Models.Report.CustomerReport;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Report.DirectCustomerReport;
using CRM.Models.Report.DynamicReport;
using CRM.Models.Report.FeedbackStatistic;
using CRM.Models.Report.FeedbackStatistic.FeedbackRating;
using CRM.Models.Report.LogStatistics;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Models.Report.SettlementReport;
using CRM.Models.Report.WagerReport;
using CRM.Models.Setting;
using Microsoft.AspNetCore.Hosting;
using Models;

public interface IExportExcelService
{
    byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments,
        IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications,
        IEnumerable<Setting> communicationTools,
        bool isRenderPicManagement);

    byte[] ExportPICManagement(IEnumerable<BaseModel> communicationTools, PicReport picReport);

    byte[] ExportSettlementReport(SettlementReportInfo reportInfo);

    byte[] ExportSummaryReport(SummaryReportModel summaryreportInfo, int year);

    byte[] ExportDirectCustomerReport(DirectCustomerReportInfo directreportInfo);

    byte[] ExportWagerReport(WagerReportModel wagerreportInfo, int year);

    byte[] ExportChatTypeMapping(IEnumerable<ChatTypeMappingModel> chatTypeMappings);

    byte[] ExportLatestFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, int top, string username);

    byte[] ExportDeletedFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories);

    byte[] ExportInformHeadline(IEnumerable<InformHeadlineModel> informs);

    byte[] ExportEditInformHeadline(
        IEnumerable<EditInform> editInforms,
        IEnumerable<InformStatus> informStatuses,
        IEnumerable<Station> informStations,
        IEnumerable<FeedbackStatus> informProductStatuses,
        string informHeadlineTitle);

    byte[] ExportNewInformHeadline(IEnumerable<NewInform> newInforms, IEnumerable<InformStatus> informStatuses, string title);

    byte[] ExportManageFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, string reportName, string reportTitle);

    byte[] ExportDeletedFeedbackStatisticReport(IEnumerable<DeletedFeedbackByHandler> deletedFeedbacks, IEnumerable<Setting> mainCategories);

    byte[] ExportLogStatisticsReport(LogStatisticsViewModel logStatistics);

    byte[] ExportLogStatisticsReportDetail(StatisticsDetailReportByDateModel logStatisticsDetail,
        IEnumerable<Setting> mainCategories, IEnumerable<Setting> communicationTools, IEnumerable<Product> products,
        IEnumerable<Product> subProducts, IEnumerable<SettingRelation> extensions, bool perReadHheadlineInfo);

    byte[] ExportIssueStatisticsReport(IssuesStatisticsReportInfo issueStatistics, string titleExcel);

    byte[] ExportStatisticFeedback(FeedbackStatisticInfo feedbackStatistic);

    byte[] ExportRatingStatisticFeedback(FeedbackRatingReport ratingFeedbackStatistic);

    byte[] ExportStatisticFeedbackDetail(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, string titleExcel);

    byte[] ExportRedemptionStatisticsSumary(IList<RedemptionStatisticsEntity> redemptionStatistics, IDictionary<string, decimal> totals, string titleExcel, int reportBy);

    byte[] ExportDynamicReport(DynamicReportInfo dynamicReportInfos, IEnumerable<Setting> mainCategories, string titleExcel);

    byte[] ExportRedemptionStatisticsDetail(IEnumerable<RedemptionStatisticsDetailEntity> redemptionStatisticsDetails);

    byte[] ExportCustomerReport(CustomerReportInfo customerReportInfo);

    byte[] ExportCategoryClassification(IEnumerable<CategoryClassification> categoryClassifications);

    byte[] ExportSiteTicket(IEnumerable<AdmSiteTicket> siteTickets, string eventTime, string eventName);

    byte[] ExportManageSMAFeedback(IEnumerable<SmaFeedbackInfo> smaFeedbackInfos, string titleExcel);
}

public class ExportExcelService(IWebHostEnvironment hostingEnvironment) : IExportExcelService
{
    public byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments,
        IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications,
        IEnumerable<Setting> communicationTools,
        bool isRenderPicManagement)
    {
        const string ExcelTemplatePath = "ExcelTemplates/PicAssignment.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new PicAssignmentExcel(templatePath, assignments, groupAssignmentCommunications, communicationTools, isRenderPicManagement);
        return excel.Export();
    }

    public byte[] ExportSettlementReport(SettlementReportInfo reportInfo)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Settlement_Issues_Report.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new SettlementReportExcel(templatePath, reportInfo);
        return excel.Export();
    }

    public byte[] ExportPICManagement(IEnumerable<BaseModel> communicationTools, PicReport picReport)
    {
        const string ExcelTemplatePath = "ExcelTemplates/PicManagement.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new PicManagementExcel(templatePath, communicationTools, picReport);
        return excel.Export();
    }

    public byte[] ExportChatTypeMapping(IEnumerable<ChatTypeMappingModel> chatTypeMappings)
    {
        const string ExcelTemplatePath = "ExcelTemplates/ChatType_Mapping.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new ChatTypeMappingExcel(templatePath, chatTypeMappings);
        return excel.Export();
    }

    public byte[] ExportLatestFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, int top, string username)
    {
        const string ExcelTemplatePath = "ExcelTemplates/LatestFeedback.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new LatestFeedbackExcel(templatePath, feedbacks, mainCategories, top, username);
        return excel.Export();
    }

    public byte[] ExportDeletedFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Deleted_Feedback.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new DeletedFeedbackExcel(templatePath, feedbacks, mainCategories);
        return excel.Export();
    }

    public byte[] ExportInformHeadline(IEnumerable<InformHeadlineModel> informs)
    {
        const string ExcelTemplatePath = "ExcelTemplates/InformHeadlines.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new InformHeadlineExcel(templatePath, informs);
        return excel.Export();
    }

    public byte[] ExportEditInformHeadline(IEnumerable<EditInform> editInforms,
        IEnumerable<InformStatus> informStatuses, IEnumerable<Station> informStations,
        IEnumerable<FeedbackStatus> informProductStatuses,
        string informHeadlineTitle)
    {
        const string ExcelTemplatePath = "ExcelTemplates/UpdateInformHeadlines.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new EditInformHeadlineExcel(templatePath, editInforms, informStatuses, informStations, informProductStatuses, informHeadlineTitle);
        return excel.Export();
    }

    public byte[] ExportNewInformHeadline(IEnumerable<NewInform> newInforms, IEnumerable<InformStatus> informStatuses, string title)
    {
        const string ExcelTemplatePath = "ExcelTemplates/NewInformHeadlines.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new NewInformHeadlineExcel(templatePath, newInforms, informStatuses, title);
        return excel.Export();
    }

    public byte[] ExportManageFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, string reportName, string reportTitle)
    {
        const string ExcelTemplatePath = "ExcelTemplates/ManageFeedback.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new ManageFeedbackExcel(templatePath, feedbacks, mainCategories, reportName, reportTitle);
        return excel.Export();
    }

    public byte[] ExportDeletedFeedbackStatisticReport(IEnumerable<DeletedFeedbackByHandler> deletedFeedbacks, IEnumerable<Setting> mainCategories)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Deleted_Feedback_Statistics.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new DeletedFeedbackStatisticExcel(templatePath, deletedFeedbacks, mainCategories);
        return excel.Export();
    }

    public byte[] ExportLogStatisticsReport(LogStatisticsViewModel logStatistics)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Log_Statistics.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var totalColumns = logStatistics.GrandTotalOfCommunicationCount.ToList().Count + logStatistics.ProductColumns.ToList().Count;

        var excel = new LogStatisticsExcel(templatePath, logStatistics, totalColumns);
        return excel.Export();
    }

    public byte[] ExportLogStatisticsReportDetail(StatisticsDetailReportByDateModel logStatisticsDetail,
        IEnumerable<Setting> mainCategories, IEnumerable<Setting> communicationTools, IEnumerable<Product> products,
        IEnumerable<Product> subProducts, IEnumerable<SettingRelation> extensions, bool perReadHheadlineInfo)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Log_Statistics_Detail.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);

        var excel = new LogStatisticsDetailExcel(templatePath, logStatisticsDetail, mainCategories,
            communicationTools, products, subProducts, extensions, perReadHheadlineInfo);
        return excel.Export();
    }

    public byte[] ExportSummaryReport(SummaryReportModel summaryreportInfo, int year)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Categories_Summary_Report.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new SummaryReportExcel(templatePath, summaryreportInfo, year);
        return excel.Export();
    }

    public byte[] ExportIssueStatisticsReport(IssuesStatisticsReportInfo issueStatistics, string titleExcel)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Issue_Statistics.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);

        var excel = new IssueStatisticsExcel(templatePath, issueStatistics, titleExcel);
        return excel.Export();
    }

    public byte[] ExportStatisticFeedback(FeedbackStatisticInfo feedbackStatistic)
    {
        const string ExcelTemplatePath = "ExcelTemplates/FeedbackStatistic.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new FeedbackStatisticExcel(templatePath, feedbackStatistic);
        return excel.Export();
    }

    public byte[] ExportRatingStatisticFeedback(FeedbackRatingReport ratingFeedbackStatistic)
    {
        const string ExcelTemplatePath = "ExcelTemplates/RatingFeedbackStatistic.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new RatingFeedbackStatisticExcel(templatePath, ratingFeedbackStatistic);
        return excel.Export();
    }

    public byte[] ExportStatisticFeedbackDetail(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, string titleExcel)
    {
        const string ExcelTemplatePath = "ExcelTemplates/FeedbackStatisticDetail.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new ManageFeedbackExcel(templatePath, feedbacks, mainCategories, string.Empty, titleExcel);
        return excel.Export();
    }

    public byte[] ExportRedemptionStatisticsSumary(IList<RedemptionStatisticsEntity> redemptionStatistics, IDictionary<string, decimal> totals, string titleExcel, int reportBy)
    {
        const string ExcelTemplatePath = "ExcelTemplates/RedemptionStatistics.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new RedemptionStatisticsExcel(templatePath, redemptionStatistics, totals, titleExcel, reportBy);
        return excel.Export();
    }

    public byte[] ExportDynamicReport(DynamicReportInfo dynamicReportInfos, IEnumerable<Setting> mainCategories, string titleExcel)
    {
        const string ExcelTemplatePath = "ExcelTemplates/DynamicReport.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new DynamicReportExcel(templatePath, dynamicReportInfos, mainCategories, titleExcel);
        return excel.Export();
    }

    public byte[] ExportRedemptionStatisticsDetail(IEnumerable<RedemptionStatisticsDetailEntity> redemptionStatisticsDetails)
    {
        const string ExcelTemplatePath = "ExcelTemplates/RedemptionStatisticsDetail.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new RedemptionStatisticsDetailExcel(templatePath, redemptionStatisticsDetails.ToList());
        return excel.Export();
    }

    public byte[] ExportCustomerReport(CustomerReportInfo customerReportInfo)
    {
        const string ExcelTemplatePath = "ExcelTemplates/CustomerReport.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new CustomerReportExcel(templatePath, customerReportInfo);
        return excel.Export();
    }

    public byte[] ExportDirectCustomerReport(DirectCustomerReportInfo directreportInfo)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Direct_Customer_Report.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new DirectReportExcel(templatePath, directreportInfo);
        return excel.Export();
    }

    public byte[] ExportWagerReport(WagerReportModel wagerreportInfo, int year)
    {
        const string ExcelTemplatePath = "ExcelTemplates/Wagers_Related_Report.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new WagerReportExcel(templatePath, wagerreportInfo, year);
        return excel.Export();
    }

    public byte[] ExportCategoryClassification(IEnumerable<CategoryClassification> categoryClassifications)
    {
        const string ExcelTemplatePath = "ExcelTemplates/CategoryClassification.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new CategoryClassificationExcel(templatePath, categoryClassifications);
        return excel.Export();
    }

    public byte[] ExportSiteTicket(IEnumerable<AdmSiteTicket> siteTickets, string eventTime, string eventName)
    {
        const string ExcelTemplatePath = "ExcelTemplates/SiteAffectedTicket.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new MncAffectedTicketExcel(templatePath, siteTickets, eventTime, eventName);
        return excel.Export();
    }

    public byte[] ExportManageSMAFeedback(IEnumerable<SmaFeedbackInfo> smaFeedbackInfos, string titleExcel)
    {
        const string ExcelTemplatePath = "ExcelTemplates/ManageSMAFeedback.xlsx";
        var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
        var excel = new ManageSmaFeedbackExcel(templatePath, smaFeedbackInfos, titleExcel);
        return excel.Export();
    }
}