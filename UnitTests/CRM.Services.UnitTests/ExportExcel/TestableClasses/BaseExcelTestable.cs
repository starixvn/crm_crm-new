namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Drawing;
    using OfficeOpenXml;

    public class BaseExcelTestable : BaseExcel
    {
        public void Public_StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            base.StyleMergeCell(worksheet, startRow, colIndex, endRow);
        }

        public void Public_RenderTitleAndHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet, int endRow, int endCol)
        {
            base.RenderTitleAndHeader(templateWorksheet, worksheet, endRow, endCol);
        }

        public void Public_DrawBorderCell(ExcelRange cell)
        {
            base.DrawBorderCell(cell);
        }

        public void Public_StyleHorizontalAlignmentCenter(ExcelRange cell)
        {
            base.StyleHorizontalAlignmentCenter(cell);
        }

        public void Public_StyleDefault(ExcelWorksheet worksheet)
        {
            base.StyleDefault(worksheet);
        }

        public void Public_SetBackgroundColor(ExcelRange cell, Color color)
        {
            base.SetBackgroudColor(cell, color);
        }
    }
}
