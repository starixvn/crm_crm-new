namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Report.SettlementReport;
    using Microsoft.AspNetCore.Hosting;

    public interface IExportExcelService
    {
        byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments);

        byte[] ExportPICManagement(IEnumerable<BaseModel> communicationTools, PicReport picReport);

        byte[] ExportSettlementReport(SettlementReportInfo reportInfo);
    }

    public class ExportExcelService : IExportExcelService
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public ExportExcelService(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments)
        {
            const string ExcelTemplatePath = "ExcelTemplates/PicAssignment.xlsx";
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, ExcelTemplatePath);
            var excel = new PicAssignmentExcel(templatePath, assignments);
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
    }
}