namespace CRM.Services.UnitTests.ExportExcel
{
    using CRM.Models.Report.SettlementReport;
    using OfficeOpenXml;

    public class SettlementReportExcelTestable : SettlementReportExcel
    {
        public SettlementReportExcelTestable(string templatePath, SettlementReportInfo reportInfo)
            : base(templatePath, reportInfo)
        {
        }

        public void Public_RenderTitle(ExcelWorksheet template, ExcelWorksheet worksheet)
        {
            base.RenderTitle(template, worksheet);
        }

        public void Public_RenderHeader(ExcelWorksheet template, ExcelWorksheet worksheet)
        {
            base.RenderHeader(template, worksheet);
        }

        public void Public_RenderBody(ExcelWorksheet template, ExcelWorksheet worksheet)
        {
            base.RenderBody(template, worksheet);
        }

        public void Public_ProcessUI(ExcelWorksheet worksheet)
        {
            base.ProcessUI(worksheet);
        }

        public void Public_SetValueRow(SettlementReportInfo report, ExcelWorksheet worksheet)
        {
            base.SetValueRow(report, worksheet);
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