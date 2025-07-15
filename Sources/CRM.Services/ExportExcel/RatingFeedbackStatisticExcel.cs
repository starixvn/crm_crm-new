namespace CRM.Services.ExportExcel;

using System;
using System.Drawing;
using CRM.Models.Report.FeedbackStatistic.FeedbackRating;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class RatingFeedbackStatisticExcel(string templatePath, FeedbackRatingReport ratingFeedbackStatistic)
    : ExcelBase(templatePath, 0, ViewResources.FeedbackStatistics_SheetName)
{
    private readonly int totalColumns = ratingFeedbackStatistic.ColumnNames.Count + StartColumnIndex;
    private const int RowStartBody = 5;
    private const byte RowStartHeader = 4;
    private const byte StartColumnIndex = 0;

    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]);
        worksheet.Cells[1, 1].Value = ratingFeedbackStatistic.Title;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var columnNames = ratingFeedbackStatistic.ColumnNames;
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartColumnIndex + 1]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartColumnIndex + 1]);
        for (var index = 0; index < columnNames.Count; index++)
        {
            worksheet.Cells[RowStartHeader, StartColumnIndex + index + 1].Value = columnNames[index];
            DrawBorderCell(worksheet.Cells[RowStartHeader, StartColumnIndex + index + 1]);
        }
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var rowIndex = RowStartBody;

        foreach (var record in ratingFeedbackStatistic.Records)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = record.ColumnData.Name;
            worksheet.Cells[rowIndex, colIndex++].Value = record.Excellent;
            worksheet.Cells[rowIndex, colIndex++].Value = record.Good;
            worksheet.Cells[rowIndex, colIndex++].Value = record.Neutral;
            worksheet.Cells[rowIndex, colIndex++].Value = record.Poor;
            worksheet.Cells[rowIndex, colIndex].Value = record.VeryPoor;
            if (rowIndex % 2 != 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, ratingFeedbackStatistic.ColumnNames.Count], EvenRowColor);
            }

            rowIndex++;
        }
        RenderTotalRow(worksheet, rowIndex);
    }

    protected internal virtual void RenderTotalRow(ExcelWorksheet worksheet, int rowIndex)
    {
        var colIndex = 1;
        worksheet.Cells[rowIndex, colIndex++].Value = "Total";
        worksheet.Cells[rowIndex, colIndex - 1].Style.Font.Bold = true;

        for (var i = 1; i < totalColumns; i++)
        {
            var sum = 0;
            for (var j = RowStartBody; j < rowIndex; j++)
            {
                sum += Convert.ToInt32(worksheet.Cells[j, i + 1].Value);
            }
            worksheet.Cells[rowIndex, colIndex].Value = sum;
            worksheet.Cells[rowIndex, colIndex].Style.Font.Bold = true;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            colIndex++;
        }
        SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex, colIndex - 1]);
        DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowIndex, totalColumns]);
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
        const byte firstRow = 1;
        const byte spaceRowTitle = 3;
        worksheet.Cells[firstRow, 1, firstRow + 1, totalColumns].Merge = true;
        worksheet.Cells[spaceRowTitle, 1, spaceRowTitle, totalColumns].Merge = true;
        SetBackgroundColor(worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, totalColumns], HeaderTitleColor);
        worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Bold = true;
        worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Color.SetColor(Color.White);
        worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, totalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthLarge = 40;
        const int WithSmall = 15;

        worksheet.DefaultColWidth = WithSmall;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(1).Width = WidthLarge;
    }
}