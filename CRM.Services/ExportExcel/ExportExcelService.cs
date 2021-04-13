namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using CRM.Models;
    using CRM.Models.ChatTypeMapping;
    using CRM.Services.ExportExcel;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Report.SettlementReport;
    using Microsoft.AspNetCore.Hosting;
    using CRM.Models.Setting;
    using CRM.Core.Services;

    public interface IExportExcelService
    {
        byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments,
            IEnumerable<AssignmentCommunication> picComms,
            IEnumerable<Setting> communicationTools,
            bool isRenderPicManagement);

        byte[] ExportPICManagement(IEnumerable<BaseModel> communicationTools, PicReport picReport);

        byte[] ExportSettlementReport(SettlementReportInfo reportInfo);

        byte[] ExportChatTypeMapping(IEnumerable<ChatTypeMappingModel> chatTypeMappings);
    }

    public class ExportExcelService : IExportExcelService
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly ICRMLogService logService;

        public ExportExcelService(IHostingEnvironment hostingEnvironment,
            ICRMLogService logService)
        {
            this.hostingEnvironment = hostingEnvironment;
            this.logService = logService;
        }

        public byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments,
            IEnumerable<AssignmentCommunication> picComms,
            IEnumerable<Setting> communicationTools,
            bool isRenderPicManagement)
        {
            const string ExcelTemplatePath = "ExcelTemplates/PicAssignment.xlsx";
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
            var excel = new PicAssignmentExcel(templatePath, assignments, picComms, communicationTools, isRenderPicManagement, logService);
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
    }
}