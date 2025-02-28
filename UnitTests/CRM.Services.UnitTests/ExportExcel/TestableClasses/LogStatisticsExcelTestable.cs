namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.LogStatistics;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class LogStatisticsExcelTestable(
    string templatePath,
    LogStatisticsViewModel logStatistics,
    int totalColumns)
    : LogStatisticsExcel(templatePath, logStatistics, totalColumns)
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

    public void Public_RenderRowValue(ExcelWorksheet worksheet, LogStatisticsBaseModel category, int currentRowIndex)
    {
        base.RenderRowValue(worksheet, category, currentRowIndex);
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

    public void Public_SetStyleHeader(ExcelRange cell)
    {
        base.SetStyleHeader(cell);
    }

    public void Public_SetBackgroundTotalRow(ExcelRange cell)
    {
        base.SetBackgroundTotalRow(cell);
    }

    public void Public_SetStyleBodyMain(ExcelRange cell)
    {
        base.SetStyleBodyMain(cell);
    }
}