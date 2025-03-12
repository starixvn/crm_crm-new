using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Models.ManageSMAFeedback;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace CRM.Services.ExportExcel
{
    public class ManageSMAFeedbackExcel(string templatePath, IEnumerable<SMAFeedbackInfo> smaFeedbackInfos, string titleExcel)
        : ExcelBase(templatePath, 0, ViewResources.ManageSMAFeedback_ExcelTile)
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalCols = 12;
        private const byte WidthExtraSmall = 7;
        private const byte WidthSmall = 10;
        private const byte WidthNormal = 15;
        private const byte WidthLarge = 25;

        private int rowIndex = RowStartBody;

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = titleExcel;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalCols]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalCols]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var index = 1;
            foreach (var smaFeedbackInfo in smaFeedbackInfos)
            {
                RenderRow(worksheet, smaFeedbackInfo, index, rowIndex++);
                index++;
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, SMAFeedbackInfo smaFeedbackInfo, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.CreateTime;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.Username;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.Level;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.Site;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.Function;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.ReviewStatus;
            worksheet.Cells[rowIndex, colIndex++].Value = smaFeedbackInfo.Comment;
            worksheet.Cells[rowIndex, colIndex].Value = smaFeedbackInfo.DiscussionSolution;
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            SetBackgroundColor(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalCols], HeaderTitleColor);
            for (var index = 3; index <= TotalCols; index++)
            {
                worksheet.Column(index).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLargest = 40;
            const int WidthLarge = 35;
            const int WidthNormal = 15;
            const int RowHeight = 15;
            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
            for (var index = 2; index <= TotalCols; index++)
            {
                worksheet.Column(index).Width = WidthNormal;
            }
            worksheet.Column(RowStartHeader).Width = WidthLargest;
            for (var index = 0; index < smaFeedbackInfos.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalCols]);
            }
        }
    }
}
