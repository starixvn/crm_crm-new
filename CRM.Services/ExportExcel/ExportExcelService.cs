namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using CRM.Models.PicAndHeadline;
    using Microsoft.AspNetCore.Hosting;

    public interface IExportExcelService
    {
        byte[] ExportPICAssignment(IEnumerable<PICAssignmentInfo> assignments);
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
    }
}