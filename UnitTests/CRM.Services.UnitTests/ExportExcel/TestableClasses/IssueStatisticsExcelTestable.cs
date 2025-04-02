namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.Report;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class IssueStatisticsExcelTestable(
    string templatePath,
    IssuesStatisticsReportInfo issuesStatistics,
    string titleExcel)
    : IssueStatisticsExcel(templatePath, issuesStatistics, titleExcel)
{
    public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderTitle(templateWorksheet, worksheet);
    }

    public void Public_RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderHeader(templateWorksheet, worksheet);
    }

    public void Public_RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderBody(templateWorksheet, worksheet);
    }

    public void Public_RendeGrandTotal(ExcelWorksheet worksheet, IList<IssuesStatisticsReportInfo> totals, int numberOfIssuesTotal, int rowTotal, int totalColumns)
    {
        base.RendeGrandTotal(worksheet, totals, numberOfIssuesTotal, rowTotal, totalColumns);
    }

    public void Public_RenderMergeCountryInfo(ExcelWorksheet worksheet, int mergeCount, IList<IssuesStatisticsReportInfo> childReport, int rowIndex)
    {
        base.RenderMergeCountryInfo(worksheet, mergeCount, childReport, rowIndex);
    }

    public void Public_SetBackgroundTotalRow(ExcelRange cell)
    {
        base.SetBackgroundTotalRow(cell);
    }

    public void Public_SetBackgroundChildTotalRow(ExcelRange cell)
    {
        base.SetBackgroundChildTotalRow(cell);
    }

    public void Public_ProcessUI(ExcelWorksheet worksheet)
    {
        base.ProcessUI(worksheet);
    }

    public void Public_SetStyle(ExcelWorksheet worksheet)
    {
        base.SetStyle(worksheet);
    }

    public void Public_SetWidthColumn(ExcelWorksheet worksheet)
    {
        base.SetWidthColumn(worksheet);
    }

    public void Public_StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
    {
        base.StyleMergeCell(worksheet, startRow, colIndex, endRow);
    }
}