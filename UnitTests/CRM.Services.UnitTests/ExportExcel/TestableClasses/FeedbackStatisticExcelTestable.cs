namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.FeedbackStatistic;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class FeedbackStatisticExcelTestable(
    string templatePath,
    FeedbackStatisticInfo feedbackStatistic)
    : FeedbackStatisticExcel(templatePath, feedbackStatistic)
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

    public void Public_RenderRow(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderBody(templateWorksheet, worksheet);
    }

    public void Public_RendeGrandTotal(ExcelWorksheet templateWorksheet, int rowTotal)
    {
        base.RenderGrandTotal(templateWorksheet, rowTotal);
    }

    public void Public_SetBackgroundTotalRow(ExcelRange cell)
    {
        base.SetBackgroundTotalRow(cell);
    }

    public void Public_SetBackgroundMainCategory(ExcelRange cell)
    {
        base.SetBackgroundMainCategory(cell);
    }

    public void Public_SetSubTotalColor(ExcelRange cell)
    {
        base.SetSubTotalColor(cell);
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
}