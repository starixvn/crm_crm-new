namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using CRM.Models;
    using CRM.Models.ChatTypeMapping;
    using CRM.Models.Feedback;
    using CRM.Models.InformHeadline;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Report;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Models.Report.LogStatistics;
    using CRM.Models.Report.SettlementReport;
    using CRM.Models.Setting;
    using CRM.Services.ExportExcel;
    using Microsoft.AspNetCore.Hosting;

    public interface IExportExcelService
    {
        byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments,
            IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications,
            IEnumerable<Setting> communicationTools,
            bool isRenderPicManagement);

        byte[] ExportPICManagement(IEnumerable<BaseModel> communicationTools, PicReport picReport);

        byte[] ExportSettlementReport(SettlementReportInfo reportInfo);

        byte[] ExportChatTypeMapping(IEnumerable<ChatTypeMappingModel> chatTypeMappings);

        byte[] ExportLatestFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, int top);

        byte[] ExportDeletedFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories);

        byte[] ExportInformHeadline(IEnumerable<InformHeadlineModel> informs);

        byte[] ExportEditInformHeadline(
            IEnumerable<EditInform> editInforms, 
            IEnumerable<InformStatus> informStatuses, 
            IEnumerable<Station> informStations, 
            IEnumerable<FeedbackStatus> informProductStatuses, 
            string informHeadlineTitle);

        byte[] ExportNewInformHeadline(IEnumerable<NewInform> newInforms, IEnumerable<InformStatus> informStatuses, string title);

        byte[] ExportManageFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories);

        byte[] ExportDeletedFeedbackStatisticReport(IEnumerable<DeletedFeedbackByHandler> deletedFeedbacks, IEnumerable<Setting> mainCategories);

        byte[] ExportLogStatisticsReport(LogStatisticsViewModel logStatistics);

        byte[] ExportLogStatisticsReportDetail(StatisticsDetailReportByDateModel logStatisticsDetail,
            IEnumerable<Setting> mainCategories, IEnumerable<Setting> communicationTools, IEnumerable<Product> products,
            IEnumerable<Product> subProducts, IEnumerable<SettingRelation> extensions);

        byte[] ExportIssueStatisticsReport(IssuesStatisticsReportInfo issueStatistics, string titleExcel);
    }

    public class ExportExcelService : IExportExcelService
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public ExportExcelService(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

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

        public byte[] ExportLatestFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories, int top)
        {
            const string ExcelTemplatePath = "ExcelTemplates/LatestFeedback.xlsx";
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
            var excel = new LatestFeedbackExcel(templatePath, feedbacks, mainCategories, top);
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

        public byte[] ExportManageFeedbackReport(IEnumerable<FeedbackDetail> feedbacks, IEnumerable<Setting> mainCategories)
        {
            const string ExcelTemplatePath = "ExcelTemplates/ManageFeedback.xlsx";
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
            var excel = new ManageFeedbackExcel(templatePath, feedbacks, mainCategories);
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
            IEnumerable<Product> subProducts, IEnumerable<SettingRelation> extensions)
        {
            const string ExcelTemplatePath = "ExcelTemplates/Log_Statistics_Detail.xlsx";
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);

            var excel = new LogStatisticsDetailExcel(templatePath, logStatisticsDetail, mainCategories,
                communicationTools, products, subProducts, extensions);
            return excel.Export();
        }

        public byte[] ExportIssueStatisticsReport(IssuesStatisticsReportInfo issueStatistics, string titleExcel)
        {
            try
            {
                const string ExcelTemplatePath = "ExcelTemplates/Issue_Statistics.xlsx";
                var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);

                var excel = new IssueStatisticsExcel(templatePath, issueStatistics, titleExcel);
                return excel.Export();
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}