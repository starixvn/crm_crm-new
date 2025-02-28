namespace CRM.Services.ExportExcel;

using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.IO;

public abstract class ExcelBase(string templatePath, short templateSheetIndex = 0, string sheetName = "Data")
{
    protected static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);
    protected static readonly Color EvenRowColor = Color.FromArgb(228, 242, 253);

    protected internal abstract void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet);

    protected internal abstract void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet);

    protected internal abstract void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet);

    protected internal virtual void ProcessUI(ExcelWorksheet worksheet)
    {
    }

    public virtual byte[] Export()
    {
        using var templateExcelPackage = new ExcelPackage(new FileInfo(templatePath));
        using var excelPackage = new ExcelPackage();
        var templateWorksheet = templateExcelPackage.Workbook.Worksheets[templateSheetIndex];
        var worksheet = excelPackage.Workbook.Worksheets.Add(sheetName);

        RenderTitle(templateWorksheet, worksheet);
        RenderHeader(templateWorksheet, worksheet);
        RenderBody(templateWorksheet, worksheet);

        ProcessUI(worksheet);

        return excelPackage.GetAsByteArray();
    }

    protected internal virtual void DrawBorderCell(ExcelRange cell)
    {
        cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
    }

    protected internal virtual void StyleDefault(ExcelWorksheet worksheet)
    {
        const int FontSize = 8;
        const string FontName = "Tahoma";
        worksheet.Cells.Style.Font.Name = FontName;
        worksheet.Cells.Style.Font.Size = FontSize;
        worksheet.Cells.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
        worksheet.Cells.Style.WrapText = true;
    }

    protected internal virtual void SetBackgroundColor(ExcelRange cell, Color color)
    {
        cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
        cell.Style.Fill.BackgroundColor.SetColor(color);
    }
}