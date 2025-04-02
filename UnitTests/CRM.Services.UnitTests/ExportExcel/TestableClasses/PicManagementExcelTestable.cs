namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.PicAndHeadline;
using Models;
using OfficeOpenXml;
using Services.ExportExcel;

public class PicManagementExcelTestable(
    string templatePath,
    IEnumerable<BaseModel> communicationTools,
    PicReport picReport)
    : PicManagementExcel(templatePath, communicationTools, picReport)
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

    public void Public_RenderRow(ExcelWorksheet worksheet, PicInfo picInfo, int index, int rowIndex)
    {
        base.RenderRow(worksheet, picInfo, index, rowIndex);
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