namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.WagerReport;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class WagerReportExcelTestable(string templatePath, WagerReportModel reportInfo, int year)
    : WagerReportExcel(templatePath, reportInfo, year)
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
    public void Public_SetValueRow(WagerByMonth report, ExcelWorksheet worksheet)
    {
        base.SetValueRow(report, worksheet);
    }

    public void Public_SetDefaultStyle(ExcelWorksheet worksheet)
    {
        base.SetDefaultStyle(worksheet);
    }
    public void Public_SetBackgroundTotalRow(ExcelRange cell)
    {
        base.SetBackgroundTotalRow(cell);
    }
}