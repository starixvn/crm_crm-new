namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.InformHeadline;
using CRM.Models.Setting;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class UpdateInformHeadlineExcelTestable(
    string templatePath,
    IEnumerable<EditInform> updateInforms,
    IEnumerable<InformStatus> informStatuses,
    IEnumerable<Station> informStations,
    IEnumerable<FeedbackStatus> informProductStatuses,
    string informHeadlineTitle)
    : EditInformHeadlineExcel(templatePath, updateInforms, informStatuses, informStations, informProductStatuses,
        informHeadlineTitle)
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

    public void Public_RenderRow(ExcelWorksheet worksheet, EditInform updateInform, int index, int rowIndex)
    {
        base.RenderRow(worksheet, updateInform, index, rowIndex);
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