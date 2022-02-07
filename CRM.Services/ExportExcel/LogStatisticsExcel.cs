namespace CRM.Services.ExportExcel
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using CRM.Models.Report.LogStatistics;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class LogStatisticsExcel : ExcelBase
    {
        private readonly LogStatisticsViewModel logStatistics;
        private readonly int totalColumns;

        private const int RowStartBody = 6;
        private const byte RowStartHeader = 4;

        protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

        public LogStatisticsExcel(string templatePath, LogStatisticsViewModel logStatistics, int totalColumns) : base(templatePath, 0, logStatistics.Name)
        {
            this.logStatistics = logStatistics;
            this.totalColumns = totalColumns;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {

            templateWorksheet.Cells[1, 1, RowStartHeader - 1, totalColumns]
                    .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, totalColumns]);
                worksheet.Cells[1, 1].Value = string.Format(ViewResources.DeletedFeedbackStatistic);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, totalColumns]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, totalColumns]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
        }

        protected internal virtual void SetColor(ExcelRange cell)
        {
            cell.Style.Font.Color.SetColor(HeaderTitleColor);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
        {
            SetBackgroundColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            worksheet.Cells.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            worksheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
        }
    }
}
