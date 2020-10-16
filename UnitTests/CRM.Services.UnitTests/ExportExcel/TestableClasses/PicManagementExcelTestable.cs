namespace CRM.Services.UnitTests.ExportExcel
{
    using CRM.Models.PicAndHeadline;
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;

    public class PicManagementExcelTestable: PicManagementExcel
    {
        public PicManagementExcelTestable(IHostingEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }

        public void Public_RenderHeader(ExcelWorksheet worksheet)
        {
            base.RenderHeader(worksheet);
        }

        public void Public_RenderRow(ExcelWorksheet worksheet, PicInfo picInfo, int index, int rowIndex)
        {
            base.RenderRow(worksheet, picInfo, index, rowIndex);
        }

        public void Public_SetStyle(ExcelWorksheet worksheet)
        {
            base.SetStyle(worksheet);
        }

        public void Public_SetWidthColumn(ExcelWorksheet worksheet)
        {
            base.SetWidthColumn(worksheet);
        }
    }
}
