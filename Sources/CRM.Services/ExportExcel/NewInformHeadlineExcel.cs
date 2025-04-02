namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using CRM.Models.InformHeadline;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class NewInformHeadlineExcel(
    string templatePath,
    IEnumerable<NewInform> newInforms,
    IEnumerable<InformStatus> informStatuses,
    string title)
    : ExcelBase(templatePath, 0, ViewResources.InformHeadlineCase)
{
    private const byte RowStartHeader = 6;
    private const byte RowStartBody = 7;
    private const byte TotalCols = 7;
    private const byte RowStartTitle = 4;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
        worksheet.Cells[1, 1].Value = ViewResources.InformHeadlineCase;
        worksheet.Cells[RowStartTitle, 1].Value = title;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        int rowIndex = RowStartBody;
        var index = 1;
        foreach (var newInform in newInforms)
        {
            RenderRow(worksheet, newInform, index, rowIndex++);
            index++;
        }
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, NewInform newInform, int index, int rowIndex)
    {
        var colIndex = 1;
        worksheet.Cells[rowIndex, colIndex++].Value = newInform.Username;
        worksheet.Cells[rowIndex, colIndex++].Value = GetInformStatusNameAsync(newInform.InformHeadlineStatusId);
        worksheet.Cells[rowIndex, colIndex++].Value = string.Empty;
        worksheet.Cells[rowIndex, colIndex++].Value = string.Empty;
        worksheet.Cells[rowIndex, colIndex++].Value = string.Empty;
        worksheet.Cells[rowIndex, colIndex++].Value = string.Empty;
        worksheet.Cells[rowIndex, colIndex].Value = string.Empty;


        var colOpen = ColorTranslator.FromHtml("#d0e6f4");
        var colClosed = ColorTranslator.FromHtml("#f1f1f1");
        if (newInform.GroupId > 0)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colOpen);
        }
        if (newInform.GroupId <= 0)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colClosed);
        }
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        for (var index = 3; index <= TotalCols; index++)
        {
            worksheet.Column(index).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthLargest = 40;
        const int WidthLarge = 35;
        const int WidthNormal = 15;
        const int RowHeight = 15;
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(1).Width = WidthLarge;
        for (var index = 2; index <= TotalCols; index++)
        {
            worksheet.Column(index).Width = WidthNormal;
        }
        worksheet.Column(RowStartTitle).Width = WidthLargest;
        for (var index = 0; index < newInforms.Count(); index++)
        {
            worksheet.Row(RowStartBody + index).Height = RowHeight;
            DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalCols]);
        }
    }

    private string GetInformStatusNameAsync(int id)
    {
        var item = informStatuses.FirstOrDefault(x => x.SettingId == id);
        return item == null ? string.Empty : item.SettingValue;
    }
}