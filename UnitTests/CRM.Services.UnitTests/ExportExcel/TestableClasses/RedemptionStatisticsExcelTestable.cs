namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class RedemptionStatisticsExcelTestable(
    string templatePath,
    IList<RedemptionStatisticsEntity> redemptionStatistics,
    IDictionary<string, decimal> totals,
    string titleExcel,
    int reportBy)
    : RedemptionStatisticsExcel(templatePath, redemptionStatistics, totals, titleExcel, reportBy)
{
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

    public void Public_RenderTotal(ExcelWorksheet template, int index)
    {
        base.RenderTotal(template, index);
    }

    public void Public_StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
    {
        base.StyleMergeCell(worksheet, startRow, colIndex, endRow);
    }

    public void Public_SetStyle(ExcelWorksheet worksheet)
    {
        base.SetStyle(worksheet);
    }

    public void Public_SetWidthColumn(ExcelWorksheet worksheet)
    {
        base.SetWidthColumn(worksheet);
    }

    public void Public_SetBackGroundColorTotal(ExcelRange cell)
    {
        base.SetBackGroundColorTotal(cell);
    }
}