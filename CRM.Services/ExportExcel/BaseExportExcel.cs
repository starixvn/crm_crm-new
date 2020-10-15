namespace CRM.Services
{
    using System.Drawing;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class BaseExportExcel
    {
        public static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);
        public static readonly Color EvenRowColor = Color.FromArgb(228, 242, 253);

        public virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
        }

        public virtual void DrawBorderCell(ExcelRange cell)
        {
            cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
        }

        public virtual void StyleHorizontalAlignmentCenter(ExcelRange cell)
        {
            cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        public virtual void StyleDefault(ExcelWorksheet worksheet)
        {
            const int FontSize = 8;
            const string FontName = "Tahoma";
            worksheet.Cells.Style.Font.Name = FontName;
            worksheet.Cells.Style.Font.Size = FontSize;
            worksheet.Cells.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            worksheet.Cells.Style.WrapText = true;
        }

        public virtual void SetBackgroudColor(ExcelRange cell, Color color)
        {
            cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
            cell.Style.Fill.BackgroundColor.SetColor(color);
        }
    }
}
