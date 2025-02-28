namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Services.ExportExcel;
using OfficeOpenXml;
public class SummaryReportExcelTestable(string templatePath, SummaryReportModel reportInfo, int year)
    : SummaryReportExcel(templatePath, reportInfo, year)
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

    public void Public_SetValueRow(SummaryReportModel report, ExcelWorksheet worksheet)
    {
        base.SetValueRow(report, worksheet);
    }

    public void Public_SetDefaultStyle(ExcelWorksheet worksheet)
    {
        base.SetDefaultStyle(worksheet);
    }
    public void Public_SetBackground(ExcelRange cell)
    {
        base.SetBackground(cell);
    }
    public void Public_SetBackgroundCategories(ExcelRange cell)
    {
        base.SetBackgroundCategories(cell);
    }
}