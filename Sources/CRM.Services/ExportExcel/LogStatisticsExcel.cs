namespace CRM.Services.ExportExcel;

using System.Drawing;
using System.Linq;
using CRM.Models.Report.LogStatistics;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class LogStatisticsExcel(string templatePath, LogStatisticsViewModel logStatistics, int totalColumns)
    : ExcelBase(templatePath, 0, logStatistics.ExcelFileName)
{
    private const int RowStartBody = 6;
    private const byte RowStartHeader = 4;

    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);
    protected static readonly Color TotalBackgroundColor = Color.FromArgb(240, 237, 196);
    protected static readonly Color GroupColor = Color.FromArgb(0, 0, 205);

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        const int rowIndexTitle = 1;
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, rowIndexTitle]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, rowIndexTitle]);
        worksheet.Cells[1, 1].Value = logStatistics.Name;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1]);
        var productColumns = logStatistics.ProductColumns.ToList();
        var communicationColumns = logStatistics.CommunicationColumns.ToList();
        var currentColumnIndex = 2;
        var step = communicationColumns.Count + 1;
        for (var i = 0; i < productColumns.Count; i++)
        {
            SetStyleHeaderProduct(worksheet, currentColumnIndex, currentColumnIndex + step - 1, productColumns[i].Name);

            for (var j = 0; j < communicationColumns.Count; j++)
            {
                SetStyleHeaderCommunication(worksheet, currentColumnIndex, communicationColumns[j].Name);
                currentColumnIndex++;
            }
            SetStyleHeaderCommunication(worksheet, currentColumnIndex, "Total");
            currentColumnIndex++;
        }
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var currentRowIndex = RowStartBody;
        foreach (var mainCategory in logStatistics.MainCategories)
        {
            SetStyleBodyMain(worksheet.Cells[currentRowIndex, 1, currentRowIndex, totalColumns + 1]);
            RenderRowValue(worksheet, mainCategory, currentRowIndex++);
            foreach (var subCategory in mainCategory.SubCategories)
            {
                RenderRowValue(worksheet, subCategory, currentRowIndex++);
            }
        }
        var granTotal = new LogStatisticsBaseModel
        {
            Name = "Grand Total",
            ListOfCommunicationCount = logStatistics.GrandTotalOfCommunicationCount,
            ListOfCommunicationSumByProduct = logStatistics.GrandTotalOfCommunicationSumByProduct
        };

        RenderRowValue(worksheet, granTotal, currentRowIndex);
        SetBackgroundTotalRow(worksheet.Cells[currentRowIndex, 1, currentRowIndex, totalColumns + 1]);
        DrawBorderCell(worksheet.Cells[RowStartBody, 1, currentRowIndex, totalColumns + 1]);
    }

    protected internal virtual void RenderRowValue(ExcelWorksheet worksheet, 
        LogStatisticsBaseModel category,int currentRowIndex
    )
    {
        var currentColumnIndex = 1;
        worksheet.Cells[currentRowIndex, currentColumnIndex].Value = category.Name;
        worksheet.Cells[currentRowIndex, currentColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;

        currentColumnIndex++;
        var listOfCommunicationSumByProduct = category.ListOfCommunicationSumByProduct;
        var listOfNumberCommunicationCount = category.ListOfCommunicationCount;

        var communicationColumnsCount = logStatistics.CommunicationColumns.ToList().Count;
        var currentCommunicationIndex = 0;
        foreach (var communicationSumByProduct in listOfCommunicationSumByProduct)
        {
            for (var i = 0; i < communicationColumnsCount; i++)
            {
                worksheet.Cells[currentRowIndex, currentColumnIndex].Value = listOfNumberCommunicationCount.ElementAt(currentCommunicationIndex);
                worksheet.Cells[currentRowIndex, currentColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                currentCommunicationIndex++;
                currentColumnIndex++;
            }
            worksheet.Cells[currentRowIndex, currentColumnIndex].Value = communicationSumByProduct;
            worksheet.Cells[currentRowIndex, currentColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            SetBackgroundColor(worksheet.Cells[currentRowIndex, currentColumnIndex], TotalBackgroundColor);
            currentColumnIndex++;
        }
    }

    protected internal virtual void SetStyleBodyMain(ExcelRange cell)
    {
        SetBackgroundColor(cell, GroupBackgroundColor);
        SetColor(cell);
    }

    protected internal virtual void SetColor(ExcelRange cell)
    {
        cell.Style.Font.Color.SetColor(GroupColor);
        cell.Style.Font.Bold = true;
    }

    protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
    {
        SetBackgroundColor(cell, HeaderTitleColor);
        cell.Style.Font.Color.SetColor(Color.White);
        cell.Style.Font.Bold = true;
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        const byte secondRows = 2;
        const byte threeRows = 3;

        worksheet.Cells[1, 1, secondRows, totalColumns + 1].Merge = true;
        worksheet.Cells[1, 1, secondRows, totalColumns + 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
        SetBackgroundColor(worksheet.Cells[1, 1, secondRows, totalColumns], HeaderTitleColor);
        DrawBorderCell(worksheet.Cells[1, 1, secondRows, totalColumns + 1]);

        worksheet.Cells[threeRows, 1, threeRows, totalColumns + 1].Merge = true;
    }

    protected internal virtual void SetStyleHeaderProduct(ExcelWorksheet worksheet, int fromColumnIndex, int toColumnIndex, string product)
    {
        var currentCells = worksheet.Cells[RowStartHeader, fromColumnIndex, RowStartHeader, toColumnIndex];
        currentCells.Merge = true;
        currentCells.Value = product;
        SetStyleHeader(currentCells);
    }

    protected internal virtual void SetStyleHeaderCommunication(ExcelWorksheet worksheet, int columnIndex, string communication)
    {
        var currentCells = worksheet.Cells[RowStartHeader + 1, columnIndex];
        currentCells.Value = communication;
        SetStyleHeader(currentCells);
    }

    protected internal virtual void SetStyleHeader(ExcelRange cell)
    {
        cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        cell.Style.Font.Color.SetColor(Color.White);
        cell.Style.Font.Bold = true;
        SetBackgroundColor(cell, HeaderTitleColor);
        DrawBorderCell(cell);
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthLarge = 35;
        const byte widthNormal = 12;
        worksheet.DefaultColWidth = widthNormal;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(1).Width = WidthLarge;
    }
}