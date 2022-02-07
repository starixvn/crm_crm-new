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

        public LogStatisticsExcel(string templatePath, LogStatisticsViewModel logStatistics, int totalColumns) : base(templatePath, 0, logStatistics.ExcelFileName)
        {
            this.logStatistics = logStatistics;
            this.totalColumns = totalColumns;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            const int rowIndexTitle = 1;
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, rowIndexTitle]
                    .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, rowIndexTitle]);
            worksheet.Cells[1, 1].Value = logStatistics.Name;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1]);
            var productColumns = logStatistics.ProductColumns.ToList();
            var communicationColumns = logStatistics.CommunicationColumns.ToList();
            var currentColumnIndex = 2;
            var step = communicationColumns.Count + 1;
            for (int i = 0; i < productColumns.Count; i++)
            {
                SetStyleHeaderProduct(worksheet, currentColumnIndex, currentColumnIndex + step - 1);

                for (int j = 0; j < communicationColumns.Count; j++)
                {
                    worksheet.Cells[RowStartHeader + 1, currentColumnIndex, RowStartHeader + 1, currentColumnIndex].Value = communicationColumns.ElementAt(j).Name;
                    currentColumnIndex++;
                }
            }    
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
            const byte secondRows = 2;
            worksheet.Cells[1, 1, secondRows, totalColumns + 1].Merge = true;
            worksheet.Cells[1, 1, secondRows, totalColumns + 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            SetBackgroundColor(worksheet.Cells[1, 1, secondRows, totalColumns], HeaderTitleColor);
        }

        protected internal virtual void SetStyleHeaderProduct(ExcelWorksheet worksheet, int fromColumnIndex, int toColumnIndex)
        {
            worksheet.Cells[RowStartHeader, fromColumnIndex, RowStartHeader, toColumnIndex].Merge = true;
            worksheet.Cells[RowStartHeader, fromColumnIndex, RowStartHeader, toColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            SetBackgroundColor(worksheet.Cells[RowStartHeader, fromColumnIndex, RowStartHeader, toColumnIndex], HeaderTitleColor);
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLarge = 35;
            const byte widthNormal = 15;
            worksheet.DefaultColWidth = widthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
        }
    }
}
