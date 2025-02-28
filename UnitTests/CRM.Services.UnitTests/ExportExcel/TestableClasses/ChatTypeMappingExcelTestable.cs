namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.ChatTypeMapping;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

public class ChatTypeMappingExcelTestable(string templatePath, IEnumerable<ChatTypeMappingModel> chatTypeMappings)
    : ChatTypeMappingExcel(templatePath, chatTypeMappings)
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

    public void Public_RenderRow(ChatTypeMappingModel chatType, int rowNum, ExcelWorksheet worksheet)
    {
        base.RenderRow(chatType, rowNum, worksheet);
    }

    public void Public_ProcessUI(ExcelWorksheet worksheet)
    {
        base.ProcessUI(worksheet);
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
}