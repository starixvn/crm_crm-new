namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using CRM.Models.PicAndHeadline;
using CRM.Resources;
using Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class PicManagementExcel(string templatePath, IEnumerable<BaseModel> communicationTools, PicReport picReport)
    : ExcelBase(templatePath, 0, ViewResources.PICManagement)
{
    private const byte RowStartBody = 6;
    private const byte RowStartHeader = 4;
    private const byte BaseColumnIndex = 10;
    private const byte StartComToolsIndex = 8;
    private int totalColumn = BaseColumnIndex;
    private const byte WidthExtraSmall = 7;
    private const byte WidthSmall = 10;
    private const byte WidthNormal = 15;
    private const byte WidthLarge = 22;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]);
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);

        totalColumn = BaseColumnIndex + communicationTools.Count() - 1;
        var tools = communicationTools.ToList();
        worksheet.Cells[RowStartHeader, StartComToolsIndex].Value = ViewResources.CommunicationTool;
        worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + tools.Count - 1].Merge = true;

        for (var index = 0; index < tools.Count; index++)
        {
            worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + index].Value = tools[index].Name;
        }

        worksheet.Cells[RowStartHeader, totalColumn - 1].Value = ViewResources.Remark;
        worksheet.Cells[RowStartHeader, totalColumn - 1, RowStartHeader + 1, totalColumn - 1].Merge = true;
        worksheet.Cells[RowStartHeader, totalColumn].Value = ViewResources.Active;
        worksheet.Cells[RowStartHeader, totalColumn, RowStartHeader + 1, totalColumn].Merge = true;
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        int rowIndex = RowStartBody;
        for (var index = 0; index < picReport.DataList.Count; index++)
        {
            RenderRow(worksheet, picReport.DataList[index], index + 1, rowIndex++);
        }
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
        DrawBorderCell(worksheet.Cells[1, 1, RowStartBody + picReport.DataList.Count - 1, totalColumn]);
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, PicInfo picInfo, int index, int rowIndex)
    {
        var colIndex = 1;
        worksheet.Cells[rowIndex, colIndex++].Value = index;
        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.PicTypeName;
        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.Username;
        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.RoleName;
        worksheet.Cells[rowIndex, colIndex++].Value = string.Join(", ", picInfo.Languages.Select(lang => lang.SettingValue));
        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.CountryName;
        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.GroupHeadline;

        var tools = communicationTools.ToList();
        for (var i = 0; i < tools.Count; i++)
        {
            var item = picInfo.CommunicationTools.Find(t => t.SettingId == tools[i].Id);
            worksheet.Cells[rowIndex, colIndex++].Value = item == null ? string.Empty : item.Value;
        }

        worksheet.Cells[rowIndex, colIndex++].Value = picInfo.Remark;
        worksheet.Cells[rowIndex, colIndex].Value = picInfo.IsActive ? ViewResources.Yes : ViewResources.No;

        worksheet.Cells[rowIndex, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        if ((index & 1) == 0)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
        }
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        const byte firstRow = 1;
        const byte spaceRowTitle = 3;
        worksheet.Cells[firstRow, 1, firstRow + 1, totalColumn].Merge = true;
        worksheet.Cells[spaceRowTitle, 1, spaceRowTitle, totalColumn].Merge = true;
        SetBackgroundColor(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn], HeaderTitleColor);
        worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Bold = true;
        worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Color.SetColor(Color.White);
        worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const byte colRole = 3;
        const byte colGroupHeadline = 6;
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(1).Width = WidthExtraSmall;
        worksheet.Column(colRole).Width = WidthSmall;
        worksheet.Column(colGroupHeadline).Width = WidthLarge;
        worksheet.Column(totalColumn - 1).Width = WidthLarge;
        worksheet.Column(totalColumn).Width = WidthExtraSmall;
    }
}