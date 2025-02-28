namespace CRM.Services.ExportExcel;

using CRM.Models.NotificationCenter;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class MncAffectedTicketExcel(
    string templatePath,
    IEnumerable<AdmSiteTicket> siteTickets,
    string eventTime,
    string eventName)
{
    private const byte RowStartHeader = 4;
    private const byte RowStartBody = 5;
    private const byte TotalCols = 5;
    private int rowIndex = RowStartBody;

    private readonly List<string> sheetNames = [ViewResources.Credit, ViewResources.Licensee];

    public virtual byte[] Export()
    {
        using var templateExcelPackage = new ExcelPackage(new FileInfo(templatePath));
        using var excelPackage = new ExcelPackage();
        for (var index = 0; index < sheetNames.Count; index++)
        {
            var templateWorksheet = templateExcelPackage.Workbook.Worksheets[index];
            var worksheet = excelPackage.Workbook.Worksheets.Add($"{sheetNames[index]}");
            var isCredit = sheetNames[index] == ViewResources.Credit;

            RenderTitle(templateWorksheet, worksheet);
            RenderHeader(templateWorksheet, worksheet);
            RenderBody(worksheet, isCredit);
            ProcessUI(worksheet, isCredit);

            rowIndex = RowStartBody;
        }

        return excelPackage.GetAsByteArray();
    }

    protected internal static IEnumerable<AdmSiteTicket> GetData(IEnumerable<AdmSiteTicket> siteTickets, bool isCredit)
    {
        var siteType = isCredit ? ViewResources.Credit : ViewResources.Licensee;
        return siteTickets.Where(item => item.SiteType == siteType);
    }

    protected internal void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
        worksheet.Cells[1, 1].Value = $" Event Time: {eventTime}\n\n Event Name: {eventName}";
        worksheet.Row(1).Height = 30;
    }

    protected internal static void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
    }

    protected internal void RenderBody(ExcelWorksheet worksheet, bool isCredit)
    {
        var fillterSiteTickets = GetData(siteTickets, isCredit);
        foreach (var siteTicket in fillterSiteTickets)
        {
            RenderRow(worksheet, siteTicket, rowIndex++, isCredit);
        }
    }

    protected internal static void RenderRow(ExcelWorksheet worksheet, AdmSiteTicket siteTicket, int rowIndex, bool isCredit)
    {
        var colIndex = 1;
        var firstElement = isCredit ? siteTicket.Username : siteTicket.ExtInfo;
        var secondElement = isCredit ? siteTicket.ExtInfo : siteTicket.Username;

        worksheet.Cells[rowIndex, colIndex++].Value = rowIndex - RowStartHeader;
        worksheet.Cells[rowIndex, colIndex++].Value = siteTicket.SiteName;
        worksheet.Cells[rowIndex, colIndex++].Value = siteTicket.TransID;
        worksheet.Cells[rowIndex, colIndex++].Value = firstElement;
        worksheet.Cells[rowIndex, colIndex].Value = secondElement;
    }

    protected internal void ProcessUI(ExcelWorksheet worksheet, bool isCredit)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet, isCredit);
    }

    protected internal static void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Column(3).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
    }

    protected internal void SetWidthColumn(ExcelWorksheet worksheet, bool isCredit)
    {
        const int WidthSmall = 15;
        const int WidthNormal = 30;
        const int RowHeight = 15;
        const int ColumnId = 1;
        const int ColumnSiteName = 2;
        const int ColumnBetID = 3;
        const int ColumnUsername = 4;
        const int ColumnHeadline = 5;
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();

        worksheet.Column(ColumnId).Width = WidthSmall;
        worksheet.Column(ColumnSiteName).Width = WidthNormal;
        worksheet.Column(ColumnBetID).Width = WidthNormal;
        worksheet.Column(ColumnUsername).Width = WidthNormal;
        worksheet.Column(ColumnHeadline).Width = WidthNormal;

        var fillterSiteTickets = GetData(siteTickets, isCredit);
        for (var index = 0; index < fillterSiteTickets.Count(); index++)
        {
            worksheet.Row(RowStartBody + index).Height = RowHeight;
            DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalCols]);
        }
    }

    protected internal static void DrawBorderCell(ExcelRange cell)
    {
        cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
    }

    protected internal static void StyleDefault(ExcelWorksheet worksheet)
    {
        const int FontSize = 8;
        const string FontName = "Tahoma";
        worksheet.Cells.Style.Font.Name = FontName;
        worksheet.Cells.Style.Font.Size = FontSize;
        worksheet.Cells.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
        worksheet.Cells.Style.WrapText = true;
    }
}