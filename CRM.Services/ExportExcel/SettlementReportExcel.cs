namespace CRM.Services
{
    using System.Drawing;
    using CRM.Models.Report.SettlementReport;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class SettlementReportExcel : ExcelBase
    {
        private const int widthColumnSmall = 15;
        private const int widthColumnLarge = 25;
        private const int widthColumnNormal = 20;
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte LastColumns = 4;
        private int rowIndex = RowStartBody;
        private readonly SettlementReportInfo reportInfo;

        public SettlementReportExcel(string templatePath, SettlementReportInfo report)
            : base(templatePath, 0, ViewResources.SheetNameSettlementIssuesReport)
        {
            this.reportInfo = report;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]);
            worksheet.Cells[1, 1].Value = reportInfo.Name;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            foreach (var report in reportInfo.ChildReports)
            {
                SetValueRow(report, worksheet);
                rowIndex += report.ChildReports.Count;
            }

            SetValueRow(reportInfo.Total, worksheet);
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetDefaultStyle(worksheet);
            SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex + reportInfo.Total.ChildReports.Count - 1, LastColumns]);
            rowIndex += reportInfo.Total.ChildReports.Count - 1;
            DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowIndex, LastColumns]);
        }

        protected internal virtual void SetValueRow(SettlementReportInfo report, ExcelWorksheet worksheet)
        {
            const byte colIndex = 1;
            if (report.ChildReports.Count > 1)
            {
                int rowMerge = rowIndex + report.ChildReports.Count - 1;
                worksheet.Cells[rowIndex, 1, rowMerge, 1].Merge = true;
                worksheet.Cells[rowIndex, LastColumns, rowMerge, LastColumns].Merge = true;
            }
            worksheet.Cells[rowIndex, colIndex].Value = report.Name;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            for (int i = 0; i < report.ChildReports.Count; i++)
            {
                var colIndexChild = colIndex + 1;
                worksheet.Cells[rowIndex + i, colIndexChild++].Value = report.ChildReports[i].Name;
                worksheet.Cells[rowIndex + i, colIndexChild].Value = report.ChildReports[i].NumberOfIssues;
            }

            worksheet.Cells[rowIndex, LastColumns].Value = report.NumberOfIssues;
            worksheet.Cells[rowIndex, LastColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
        {
            SetBackgroundColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetDefaultStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            const byte CountryColumn = 2;
            const byte AmountColumn = 3;
            worksheet.Column(1).Width = widthColumnSmall;
            worksheet.Column(LastColumns).Width = widthColumnNormal;
            worksheet.Column(CountryColumn).Width = widthColumnLarge;
            worksheet.Column(AmountColumn).Width = widthColumnLarge;
        }
    }
}