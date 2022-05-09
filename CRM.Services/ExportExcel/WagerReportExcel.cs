namespace CRM.Services.ExportExcel
{
    using CRM.Models.Report.WagerReport;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using System.Drawing;

    public class WagerReportExcel : ExcelBase
    {
        private readonly WagerReportModel wagerreportInfo;
        private const int widthColumnSmall = 15;
        private const int widthColumnLarge = 25;
        private const int widthColumnNormal = 20;
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte LastColumns = 4;
        private int rowIndex = RowStartBody;

        public WagerReportExcel(string templatePath, WagerReportModel report, int year)
            : base(templatePath, 0, string.Format(ViewResources.WagerReportExcelName, year))
        {
            this.wagerreportInfo = report;
        }
        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            foreach (var report in wagerreportInfo.WagerByMonths)
            {
                SetValueRow(report, worksheet);
                rowIndex += report.Wagers.Count;
            }

            SetValueRow(wagerreportInfo.GrandTotal, worksheet);
        }

        protected internal virtual void SetValueRow(WagerByMonth report, ExcelWorksheet worksheet)
        {
            const byte colIndex = 1;
            if (report.Wagers.Count > 1)
            {
                int rowMerge = rowIndex + report.Wagers.Count - 1;
                worksheet.Cells[rowIndex, 1, rowMerge, 1].Merge = true;
                worksheet.Cells[rowIndex, LastColumns, rowMerge, LastColumns].Merge = true;
            }
            worksheet.Cells[rowIndex, colIndex].Value = report.Month;
            worksheet.Cells[rowIndex, colIndex].Style.Font.Bold = true;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            for (int i = 0; i < report.Wagers.Count; i++)
            {
                var colIndexChild = colIndex + 1;
                worksheet.Cells[rowIndex + i, colIndexChild++].Value = report.Wagers[i].Name;
                worksheet.Cells[rowIndex + i, colIndexChild].Value = report.Wagers[i].Amount;
            }

            worksheet.Cells[rowIndex, LastColumns].Value = report.Total;
            worksheet.Cells[rowIndex, LastColumns].Style.Font.Bold = true;
            worksheet.Cells[rowIndex, LastColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]);
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]
                    .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]);
            worksheet.Cells[1, 1].Value = wagerreportInfo.ReportTitle;
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetDefaultStyle(worksheet);
            SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex + wagerreportInfo.GrandTotal.Wagers.Count - 1, LastColumns]);
            rowIndex += wagerreportInfo.GrandTotal.Wagers.Count - 1;
            DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowIndex, LastColumns]);
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
            const byte WagersColumn = 2;
            const byte AmountColumn = 3;
            worksheet.Column(1).Width = widthColumnSmall;
            worksheet.Column(LastColumns).Width = widthColumnNormal;
            worksheet.Column(WagersColumn).Width = widthColumnLarge;
            worksheet.Column(AmountColumn).Width = widthColumnLarge;
        }
    }
}
