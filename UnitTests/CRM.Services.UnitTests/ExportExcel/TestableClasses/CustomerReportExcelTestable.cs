namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using CRM.Models.Report.CustomerReport;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class CustomerReportExcelTestable(
    string templatePath,
    CustomerReportInfo customerReportInfo)
    : CustomerReportExcel(templatePath, customerReportInfo)
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

    public void Public_RenderRow(ExcelWorksheet worksheet, CustomerInfo customerInfo, int index, int rowIndex)
    {
        base.RenderRow(worksheet, customerInfo, index, rowIndex);
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