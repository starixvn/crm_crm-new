namespace CRM.Services.UnitTests.ExportExcel
{
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;

    public class PicAssignmentExcelTestable : PicAssignmentExcel
    {
        public PicAssignmentExcelTestable(IHostingEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }

        public void Public_RenderTitleAndHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            this.RenderTitleAndHeader(templateWorksheet, worksheet);
        }
    }
}