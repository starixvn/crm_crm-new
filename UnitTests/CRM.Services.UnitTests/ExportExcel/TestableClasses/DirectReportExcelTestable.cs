namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.DirectCustomerReport;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class DirectReportExcelTestable(string templatePath, DirectCustomerReportInfo reportInfo)
    : DirectReportExcel(templatePath, reportInfo)
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

    public void Public_RenderRow(ExcelWorksheet worksheet, DirectCustomerInfo report, int rowIndex)
    {
        base.RenderRow(worksheet, report, rowIndex);
    }

    public void Public_ProcessUI(ExcelWorksheet worksheet)
    {
        base.ProcessUI(worksheet);
    }

    public void Public_SetDefaultStyle(ExcelWorksheet worksheet)
    {
        base.SetDefaultStyle(worksheet);
    }
    public void Public_SetBackground(ExcelRange cell)
    {
        base.SetBackground(cell);
    }
}