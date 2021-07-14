namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using CRM.Models;
    using CRM.Models.ChatTypeMapping;
    using CRM.Models.Feedback;
    using CRM.Models.PicAndHeadline;
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
            var excel = new FeedbackReportExcel(templatePath, feedbacks, mainCategories, top);
            return excel.Export();
        }
    }
}