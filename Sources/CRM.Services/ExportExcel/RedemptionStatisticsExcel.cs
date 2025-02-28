namespace CRM.Services.ExportExcel;

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class RedemptionStatisticsExcel(
    string templatePath,
    IList<RedemptionStatisticsEntity> redemptionStatistics,
    IDictionary<string, decimal> totals,
    string titleExcel,
    int reportBy)
    : ExcelBase(templatePath, 0, ViewResources.RedemptionStatistics)
{
    private const byte RowStartHeader = 4;
    private const byte RowStartBody = 5;
    private const byte TotalColumns = 3;
    private const byte StartTotalCount = 2;
    private const byte WidthNormal = 20;
    private const byte ReportByYear = 2;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        worksheet.Cells[1, 1].Value = titleExcel;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var colIndex = 1;
        int rowIndex = RowStartBody;
        for(var index = 0; index < redemptionStatistics.Count; index ++)
        {
            colIndex = 1;
            var redemption = redemptionStatistics[index];
            var isReportByYear = reportBy == ReportByYear;
            var date = isReportByYear ? redemption.Year.ToString() 
                : ((new DateTimeOffset(2022, redemption.Month, 1,0,0,0,TimeSpan.Zero).DateTime).ToString("MMMM") + " " + redemption.Year.ToString());
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = date;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = redemption.Currency;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            worksheet.Cells[rowIndex, colIndex].Value = redemption.Amount.ToString(CultureInfo.InvariantCulture);
            if ((index & 1) == 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            }
            rowIndex++;
        }
        RenderTotal(worksheet, rowIndex);
    }

    protected internal virtual void RenderTotal(ExcelWorksheet worksheet, int rowIndex)
    {
        var colIndex = 1;
        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex - 1 + totals.Count);
        SetBackGroundColorTotal(worksheet.Cells[rowIndex, colIndex, rowIndex - 1 + totals.Count, TotalColumns]);
        worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[rowIndex, colIndex++].Value = "Total";
        worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[rowIndex, colIndex++].Value = totals.Keys.First();
        worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[rowIndex, colIndex].Value = totals.Values.First().ToString(CultureInfo.InvariantCulture);
        for (var index = 1; index < totals.Count; index++)
        {
            colIndex = StartTotalCount;
            rowIndex++;
            var item = totals.ElementAt(index);
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = item.Key;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex].Value = item.Value.ToString(CultureInfo.InvariantCulture);
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }
        DrawBorderCell(worksheet.Cells[1, 1, rowIndex, TotalColumns]);
    } 


    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
    {
        worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
        DrawBorderCell(worksheet.Cells[startRow, colIndex]);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        SetBackgroundColor(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns], HeaderTitleColor);
        worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Bold = true;
        worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Color.SetColor(Color.White);
        worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();
    }

    protected internal virtual void SetBackGroundColorTotal(ExcelRange cell)
    {
        SetBackgroundColor(cell, HeaderTitleColor);
        cell.Style.Font.Color.SetColor(Color.White);
        cell.Style.Font.Bold = true;
    }
}