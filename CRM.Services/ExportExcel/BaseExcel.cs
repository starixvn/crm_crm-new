namespace CRM.Services
{
    using System.Drawing;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public abstract class BaseExcel
    {
        protected static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);
        protected static readonly Color EvenRowColor = Color.FromArgb(228, 242, 253);

        protected internal virtual void RenderTitleAndHeader(ExcelWorksheet template, ExcelWorksheet worksheet, int endRow, int endCol)
        {
            template.Cells[1, 1, endRow, endCol].Copy(worksheet.Cells[1, 1, endRow, endCol]);
        }

        protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
        }

        protected internal virtual void DrawBorderCell(ExcelRange cell)
        {
            cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
        }

        protected internal virtual void StyleHorizontalAlignmentCenter(ExcelRange cell)
        {
            cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
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

        protected internal virtual void SetBackgroudColor(ExcelRange cell, Color color)
        {
            cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
            cell.Style.Fill.BackgroundColor.SetColor(color);
        }
    }
}
