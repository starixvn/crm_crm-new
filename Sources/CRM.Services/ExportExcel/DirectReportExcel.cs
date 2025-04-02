namespace CRM.Services.ExportExcel;

using CRM.Models.Report.DirectCustomerReport;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

public class DirectReportExcel(string templatePath, DirectCustomerReportInfo report)
    : ExcelBase(templatePath, 0, string.Format(ViewResources.DirectCustomerReport))
{
    private const byte rowStartHeader = 4;
    private const byte rowStartBody = 5;
    private const int numberTwo = 2;
    private readonly byte LastColumns = 30;
    private int rowIndex = rowStartBody;

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        foreach(var direct in report.CustomerList)
        {
            RenderRow(worksheet, direct, rowIndex++);
        }
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, DirectCustomerInfo direct, int rowIndex)
    {
        var colIndex = 1;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Headline ?? "not assign group";
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Username;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Status;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Site;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Currency;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Position;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.IntroducedBy;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Language_name;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.CountryName;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Checker;
        worksheet.Cells[rowIndex, colIndex].Value = direct.IsVIP? "√" : "";
        worksheet.Cells[rowIndex, colIndex++].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.FirstName;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.LastName;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Phone;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Phone2;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Phone3;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.PIC1;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.PIC2;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.PIC3;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.PIC4;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.MobilePhone;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Email;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Skype;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.MSN;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.WhatsApp;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Line;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.WeChat;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.Yahoo;
        worksheet.Cells[rowIndex, colIndex++].Value = direct.BBM;
        worksheet.Cells[rowIndex, colIndex].Value = direct.QQ;

        if (rowIndex % numberTwo == 0)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, LastColumns], EvenRowColor);
        }
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[rowStartHeader, 1, rowStartHeader, LastColumns]
            .Copy(worksheet.Cells[rowStartHeader, 1, rowStartHeader, LastColumns]);
    }

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, rowStartHeader - 1, LastColumns]
            .Copy(worksheet.Cells[1, 1, rowStartHeader - 1, LastColumns]);
    }
    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetDefaultStyle(worksheet);
        SetBackground(worksheet.Cells[rowStartBody - 1, 1, rowStartBody - 1, LastColumns]);
        DrawBorderCell(worksheet.Cells[rowStartBody - 1, 1, rowIndex-1, LastColumns]);
    }

    protected internal virtual void SetDefaultStyle(ExcelWorksheet worksheet)
    {
        var columnWidths = new[]{
            20, 20, 12, 12, 20, 20, 20, 25, 25, 25, 25, 25, 25,
            25, 25, 25, 25, 25, 25, 25,
            30, 30, 20, 25, 25, 25, 25, 28, 20, 20
        };
        StyleDefault(worksheet);
        for(var i = 0; i < columnWidths.Length; i++)
        {
            worksheet.Column(i + 1).Width = columnWidths[i];
        }
    }
    protected internal virtual void SetBackground(ExcelRange cell)
    {
        SetBackgroundColor(cell, HeaderTitleColor);
        cell.Style.Font.Color.SetColor(Color.White);
        cell.Style.Font.Bold = true;
    }
}