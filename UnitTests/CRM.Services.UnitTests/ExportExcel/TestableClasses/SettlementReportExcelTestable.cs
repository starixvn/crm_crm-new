namespace CRM.Services.UnitTests.ExportExcel
{
    using CRM.Models.Report.SettlementReport;
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;

    public class SettlementReportExcelTestable : SettlementReportExcel
    {
        public SettlementReportExcelTestable(IHostingEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }

        public void Public_SetValueRow(int rowIndex, SettlementReportInfo report, ExcelWorksheet worksheet)
        {
            base.SetValueRow(rowIndex, report, worksheet);
        }

        public void Public_SetBackgroundTotalRow(ExcelRange cell)
        {
            base.SetBackgroundTotalRow(cell);
        }

        public void Public_SetDefaultStyle(ExcelWorksheet worksheet)
        {
            base.SetDefaultStyle(worksheet);
        }
    }
}
